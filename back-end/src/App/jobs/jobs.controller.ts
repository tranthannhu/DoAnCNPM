import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  Request,
  SetMetadata,
  Query,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { BaseController } from 'src/common/Base/base.controller';
import { Methods } from 'src/common/decorators/method.decorator';
import { Modules } from 'src/common/decorators/module.decorator';
import { UserDecorator, UserSession } from 'src/common/decorators/user.decorator';
import { methodEnum } from 'src/common/enums/method.enum';
import { ModuleEnum } from 'src/common/enums/module.enum';
import { Job } from 'src/entity/job.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { getManager, getRepository, In, IsNull, Not, Repository } from 'typeorm';
import { JobRepository } from './jobs.repository';
import { JobService } from './jobs.service';
import * as _ from 'lodash';
import { JobDTO } from './job.dto';
import * as nodemailer from 'nodemailer';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GeoDTO } from './geo.dto';
import { getDistance } from 'geolib';
import { JobToCv } from 'src/entity/jobtocv.entity';
import { clientService } from 'src/grpc/route.service';
import { UserRequest } from 'models/rs_pb';
import { CreateJobDTO } from './createJob.dto';
import { Tag } from '../tags/entities/tag.entity';

@Crud({
  model: {
    type: Job,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
  query: {
    filter: [],
    join: {
      user: {
        eager: true,
        exclude: [
          'password',
          'active',
          'roleId',
          'createdat',
          'updatedat',
          'deletedat',
        ],
      },
      'user.profile': {
        eager: true,
        exclude: [
          'cvURL',
          'quantity',
          'experience',
          'createdat',
          'updatedat',
          'deletedat',
        ],
      },
      // categories: {
      //   eager: true,
      //   exclude: ['createdat', 'updatedat', 'deletedat', 'parentId'],
      // },
      address: {
        eager: true,
        exclude: ['createdat', 'updatedat', 'deletedat'],
      },
      tags: {
        eager: true,
        exclude: ['createdat', 'updatedat', 'deletedat'],
      }
    },
  },
})
@ApiTags('v1/jobs')
@Controller('/api/v1/jobs')
@Modules(ModuleEnum.JOB)
@SetMetadata('entity', ['jobs'])
export class JobsController extends BaseController<Job> {
  constructor(
    public service: JobService,
    private readonly repository: JobRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(repository);
  }

  @Override('createOneBase')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Methods(methodEnum.CREATE)
  async createOne(@Body() dto: CreateJobDTO, @UserSession() user) {
    return this.service.createJob(dto, user.users.id);
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Job) {
    try {
      // const favorite = await this.service.getAllFavoriteJob();
      // const allJob = await this.base.getManyBase(req);
      // for (let i = 0; i < count(allJob); i++)
      console.log(JSON.stringify(req));
      const response: any = await this.base.getManyBase(req);

      // let isFavorite: Array<any>;

      // if (response.count) {
      //   isFavorite = response.data.map(job => {
      //     // console.log('job', job);

      //     if (_.find(favorite, { jobId: job.id })) {
      //       job.isFavorite = true;
      //     } else {
      //       job.isFavorite = false;
      //     }
      //     return job;
      //   });
      //   return { ...response, data: isFavorite };
      // } else {
      //   isFavorite = response.map(job => {
      //     // console.log(_.find(favorite, { jobId: job.id }));
      //     if (_.find(favorite, { jobId: job.id })) {
      //       job.isFavorite = true;
      //     } else {
      //       job.isFavorite = false;
      //     }
      //     return job;
      //   });
      // }
      // return isFavorite;
      return response
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  @Get('all')
  async getAll(@Body('userId') userId: string) {
    const allJob: any = await this.repository.find();
    const currentDate = new Date();
    const checkJobDeadline = allJob.filter(job => {
      const parts = job.deadline.split('-');
      const jobDeadline = new Date(
        `${parts[1]}/${parts[2]}/${parts[0]}`,
      );
      return jobDeadline.getTime() >= currentDate.getTime();
    });
    if (userId) {
      const applied = await this.service.getAllAppliedJob(userId);
      const favorite = await this.service.getAllFavoriteJobByUserId(userId);
      const isFavorite = checkJobDeadline.map(job => {
        // console.log(_.find(favorite, { jobId: job.id }));
        if (_.find(favorite, { jobId: job.id })) {
          job.isFavorite = true;
        } else {
          job.isFavorite = false;
        }
        job.isApplied = applied.some(_jobToCv => _jobToCv.jobId === job.id);
        return job;
      });
      return isFavorite;
    }
    else return checkJobDeadline.map(job => {
      job.isFavorite = false;
      job.isApplied = false;
      return job;
    });
  }

  @Get('favorites')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getFavoritesByUser(@UserSession() user: any) {
    const userId = user.users.id;
    return this.service.getFavoritesByUser(userId);
  }

  @Put('active/:id')
  @Methods(methodEnum.UPDATE)
  async activeJob(@Param('id') id: string) {
    try {
      const findJob = await this.repository.findOne({ id: id });
      if (!findJob) {
        return new HttpException(
          {
            message: 'Job not found',
            error: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.repository.update({ id: id }, { status: true });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('inactive/all')
  async getInactiveJob(@Request() req) {
    const limit = req.query.hasOwnProperty('limit') ? req.query.limit : 10;
    const page = req.query.hasOwnProperty('page') ? req.query.page : 1;
    const sort = req.query.hasOwnProperty('sort') ? req.query.sort : null;

    try {
      return this.repository.paginate(
        {
          limit,
          page,
          sort,
        },
        { relations: ['user'] },
        { condition: { status: false, deletedat: IsNull() } },
      );
    } catch (err) {
      console.log('err', err);
    }
  }

  @Put('accept/:id')
  @Methods(methodEnum.UPDATE)
  @UsePipes(new ValidationPipe())
  async acceptJob(
    @Body() jobDTO: JobDTO,
    @Param('id') id: string,
    @UserSession() user: any,
  ) {
    try {
      // console.log('jere');
      // return;
      const job = await this.repository.findOne({ id: id });
      const acceptedUser = await this.userRepository.findOne({
        id: jobDTO.userId,
      });
      // return acceptedUser;
      console.log('da goi accept');
      await this.service.acceptJob(jobDTO.userId, id, user.users.id);

      const sendTitle = 'Your CV has been reviewed and accepted by the recruitment';
      const sendBody = `Congratulation, your CV has been accepted by the recruitment for ${job.name}. Contact them to get more details!`;
      this.service.sendAppNotification(acceptedUser.id, {
        notification: {
          title: sendTitle,
          body: sendBody
        }
      })
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vietdanh.kiemtien.01@gmail.com', // generated ethereal user
          pass: 'kiemtien01', // generated ethereal password
        },
      });

      // send mail with defined transport object
      const mailOptions = {
        from: '"Career Network" <vietdanh.kiemtien.01@gmail.com>', // sender address
        to: acceptedUser.email, // list of receivers
        subject: sendTitle, // Subject line
        text: sendBody, // plain text body
        // html: `<a>Here's your password for login as employee</b><p>Make sure you don't share this email public</p><b>password: ${generatePassword}</b><p>Our best</p><b>Twist Team</b>`, // html body
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (err) {
      return {
        status: false,
      };
    }
  }

  @Get('softdelete/all')
  @Methods(methodEnum.READ)
  async getSoftDeleteList(@Request() req) {
    const limit = req.query.hasOwnProperty('limit') ? req.query.limit : 10;
    const page = req.query.hasOwnProperty('page') ? req.query.page : 1;
    const sort = req.query.hasOwnProperty('sort') ? req.query.sort : null;
    console.log('limit', limit);
    return await this.repository.paginate(
      {
        limit,
        page,
        sort,
      },
      { relations: ['user'] },
      { condition: { deletedat: Not(IsNull()) } },
    );
  }

  @Get('applied')
  @Methods(methodEnum.READ)
  async getAppliedJobByCompany(@UserSession() user: any) {
    try {
      const userId = user.users.id;
      if (user.users.role === 'CONTRIBUTOR') {
        return this.service.getListUserAppliedJob(userId);
      } else if (user.users.role === 'USER') {
        return this.service.getJobAppliedByCompany(userId);
      } else {
        throw new HttpException(
          {
            message: 'Internal Server Error',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('applied/:id')
  @Methods(methodEnum.READ)
  async getOneJobAppliedUser(@Param('id') id: string) {
    return this.service.getOneJobAppliedUser(id);
  }

  @Get('nearest/all')
  async getJobNearest(@Body() geoDTO: GeoDTO) {
    // console.log('geo', geoDTO);
    const jobs = await this.repository.find({
      relations: ['address'],
    });
    return jobs.filter(job => {
      const distance = getDistance(
        { latitude: job.address.latitude, longitude: job.address.longitude },
        { latitude: geoDTO.lat, longitude: geoDTO.long },
      );
      if (distance < geoDTO.distance * 1000) return job;
    });
  }

  @Override('getOneBase')
  async getOne(@ParsedRequest() req: CrudRequest) {
    try {
      const data = await this.base.getOneBase(req);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Job not found',
          error: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('getOne/recently/:id')
  @ApiBearerAuth()
  async getOneRecently(@Param('id') id: string, @UserDecorator() user) {
    try {
      const job = await this.repository.findOne({
        where: { id },
        relations: ['user', 'user.profile', 'categories', 'address', 'tags'],
      });
      const jobId = id;
      const userId = user?.id;
      let isFavorite = false;
      let isApplied = false;
      let isAccepted = false;
      let isDenied = false;
      if (userId) {
        await this.service.updateRecently(userId, id);
        const applied = await this.service.getAllAppliedJob(userId);
        const favorite = await this.service.getAllFavoriteJobByUserId(userId);
        isApplied = applied.some(_jobToCv => _jobToCv.jobId === jobId);
        console.log('->>>> favorite ', favorite);
        isFavorite = favorite.some(_jobFavorite => (_jobFavorite.jobId === jobId) && (!_jobFavorite.deletedat));
        const user: User = await getRepository(User).findOne(userId, { relations: ["profile", "profile.cvs"] });
        const cvs = user.profile.cvs;
        if (cvs.length) {
          const sjobToCv = await getRepository(JobToCv).find({ jobId: jobId, cvId: In(cvs.map((cv) => cv.id)) });
          isAccepted = sjobToCv.some((jtc) => jtc.status == true);
          isDenied = !sjobToCv.every((jtc) => jtc.isDenied == false);
        }
      }
      return {
        ...job,
        isApplied,
        isFavorite,
        isAccepted,
        isDenied
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Job not found',
          error: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('getOne/:id')
  @ApiBearerAuth()
  async getOneJobDetail(@Param('id') id: string, @UserDecorator() user) {
    try {
      const job = await this.repository.findOne({
        where: { id },
        relations: ['user', 'user.profile', 'categories', 'address', 'tags'],
      });
      const jobId = id;
      const userId = user?.id;
      let isFavorite = false;
      let isApplied = false;
      let isAccepted = false;
      let isDenied = false;
      if (userId) {
        // this.service.updateRecently(userId, id);
        const applied = await this.service.getAllAppliedJob(userId);
        const favorite = await this.service.getAllFavoriteJobByUserId(userId);
        isApplied = applied.some(_jobToCv => _jobToCv.jobId === jobId);
        console.log('->>>> favorite ', favorite);
        isFavorite = favorite.some(_jobFavorite => (_jobFavorite.jobId === jobId) && (!_jobFavorite.deletedat));
        const user: User = await getRepository(User).findOne(userId, { relations: ["profile", "profile.cvs"] });
        const cvs = user.profile.cvs;
        if (cvs.length) {
          const sjobToCv = await getRepository(JobToCv).find({ jobId: jobId, cvId: In(cvs.map((cv) => cv.id)) });
          isAccepted = sjobToCv.some((jtc) => jtc.status == true);
          isDenied = !sjobToCv.every((jtc) => jtc.isDenied == false);
        }
      }
      return {
        ...job,
        isApplied,
        isFavorite,
        isAccepted,
        isDenied
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Job not found',
          error: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put('updateOne/:id')
  async updateUser(@Body() dto: Partial<Job>, @Param('id') id: string) {
    try {
      const result = await this.repository.findOne({ id: id });
      if (!result) {
        throw new HttpException(
          {
            message: 'Not Found',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.repository.update({ id }, dto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Override('deleteOneBase')
  async softDelete(@ParsedRequest() req: CrudRequest): Promise<void> {
    const id = req.parsed.paramsFilter.find(
      f => f.field === 'id' && f.operator === '$eq',
    ).value;
    const data = this.repository.findOne({ where: { id } });
    if (!data) {
      throw new HttpException(
        {
          message: 'Not Found',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this.repository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException('Incomplete CrudRequest');
    }
  }

  @Delete('/delete/:id')
  async forceDelete(
    @ParsedRequest() req: CrudRequest,
    @Param('id') id: string,
  ): Promise<void> {
    console.log(id);
    const data = this.repository.findOne({
      where: { id, deletedat: IsNull() },
    });
    if (!data) {
      throw new HttpException(
        {
          message: 'Not Found',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this.repository.delete({ id, deletedat: IsNull() });
    } catch (error) {
      throw new InternalServerErrorException('Incomplete CrudRequest');
    }
  }

  /* Restore one Job */
  @Patch('/restore/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async restore(@Param('id') id: string): Promise<void> {
    // const id = req.parsed.paramsFilter.find(
    //   f => f.field === 'id' && f.operator === '$eq',
    // ).value;

    const data = await this.repository.findOne(id, { withDeleted: true });
    if (!data) {
      throw new HttpException(
        {
          message: 'Not Found',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.repository.restore({ id });
  }

  @Post('/:id/favorites')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async favoritesJob(@Param('id') id: string, @UserSession() user) {
    const userId = user.users.id;
    return this.service.addFavoritesJob(id, userId);
  }

  @Post('/:id/applies')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async appliesJOb(@Param('id') id: string, @UserSession() user) {
    const userId = user.users.id;
    return this.service.appliesJob(id, userId);
  }

  @Get('accept/all/user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllAcceptedUser(@UserSession() user) {
    return this.service.getAllAcceptedUser(user.users.id);
  }

  @Get('accept/:id/user')
  async getAllgetAcceptedUserByJobIdAcceptJob(@Param('id') id: string) {
    return this.service.getAcceptedUserByJobId(id);
  }

  @Get('detail/:jobId')
  async getJob(@Param('jobId') jobId: string, @Query('userId') userId: string) {
    const job: any = await getRepository(Job).findOne(jobId, { relations: ["categories", "address", "user", "user.profile"] });
    if (!job) return null;
    // if (userId) {
    //   const applied = await this.service.getAllAppliedJob(userId);
    //   const favorite = await this.service.getAllFavoriteJobByUserId(userId);
    //   job.isApplied = applied.some(_jobToCv => _jobToCv.jobId === jobId);
    //   job.isFavorite = favorite.some(_jobFavorite => _jobFavorite.jobId === jobId);
    // }
    // else {
    //   job.isFavorite = false;
    //   job.isApplied = false;
    // }
    let isFavorite = false;
    let isApplied = false;
    let isAccepted = false;
    let isDenied = false;
    if (userId) {
      const applied = await this.service.getAllAppliedJob(userId);
      const favorite = await this.service.getAllFavoriteJobByUserId(userId);
      isApplied = applied.some(_jobToCv => _jobToCv.jobId === jobId);
      isFavorite = favorite.some(_jobFavorite => _jobFavorite.jobId === jobId);
      const user: User = await getRepository(User).findOne(userId, { relations: ["profile", "profile.cvs"] });
      const cvs = user.profile.cvs;
      if (!cvs.length) return null;
      const sjobToCv = await getRepository(JobToCv).find({ jobId: jobId, cvId: In(cvs.map((cv) => cv.id)) });
      isAccepted = sjobToCv.some((jtc) => jtc.status == true);
      isDenied = !sjobToCv.every((jtc) => jtc.isDenied == false);
    }
    return {
      ...job,
      isApplied,
      isFavorite,
      isAccepted,
      isDenied
    };
    // return job;
  }

  @Get('/rs/all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getItemProfile(@Request() req, @UserSession() user) {
    try {
      console.log('->>user', user);
      const limit = req.query.hasOwnProperty('limit') ? req.query.limit : 10;
      const page = req.query.hasOwnProperty('page') ? req.query.page : 1;
      const sort = req.query.hasOwnProperty('sort') ? req.query.sort : null;

      const requestParam = new UserRequest();
      requestParam.setId(user.users.id);
      //Remote Procedure Call: Recommendation Server Python
      const itemIds = await clientService.getItemRecommended(requestParam);

      return this.service.getItemBaseOnRS({ limit, page, sort }, itemIds.getItemidsList(), user.users.id);
    } catch (err) {
      console.log('-->err', err);
      //ToDo: get job in normal mode
    }
  }

  /* Get all tags */
  @Get('/tags/all')
  async getAllCurrentTags() {
    return this.service.getAllCurrentTags();
  }

  /* Create one tag */
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        tagName: {
          type: 'string',
        },
      },
    },
  })
  @Post('/tags')
  async createOneTag(@Body('tagName') tagName: string) {
    const newTag = new Tag();
    newTag.name = tagName;
    return await getRepository(Tag).save(newTag);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/deny')
  async denyCandidate(@Query('cvId') cvId: string, @Query('jobId') jobId: string) {
    console.log(cvId);
    console.log(jobId);
    console.log('co zo day');
    const jtc = await getRepository(JobToCv).findOne({ where: { cvId: cvId, jobId: jobId }, relations: ["cv", "cv.profile", "cv.profile.user", "job"] });
    console.log(jtc);
    if (!jtc) return "not found";
    await getManager().query(
      `UPDATE "job_to_cv" set "isDenied" = 'true', "status"= 'false' WHERE "jobToCvId"='${jtc.jobToCvId}'`
    );

    const sendTitle = 'Your CV has been reviewed and denied by the recruitment';
    const sendBody = `Unfortunately, your CV has been denied by the recruitment for ${jtc.job.name}. Contact them to get more details!`;
    this.service.sendAppNotification(jtc.cv.profile.user.id, {
      notification: {
        title: sendTitle,
        body: sendBody
      }
    })
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vietdanh.kiemtien.01@gmail.com', // generated ethereal user
        pass: 'kiemtien01', // generated ethereal password
      },
    });

    // send mail with defined transport object
    const mailOptions = {
      from: '"Career Network" <vietdanh.kiemtien.01@gmail.com>', // sender address
      to: jtc.cv.profile.user.email, // list of receivers
      subject: sendTitle, // Subject line
      text: sendBody, // plain text body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return {
      isDenied: true,
    }
  }

  @Get('/search/autocomplete')
  async searchJobAutocomplete(@Query('s') s: string) {
    const res = await getManager().query(
      `SELECT TOP 5 name, id from tags WHERE name LIKE '%${s}%'`
    )
    return res;
  }
}

