import { BadRequestException, Body, ConflictException, Controller, Delete, Get, InternalServerErrorException, Param, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppliedJob } from 'src/entity/applied_job.entity';
import { CV } from 'src/entity/cv.entity';
import { Job } from 'src/entity/job.entity';
import { JobToCv } from 'src/entity/jobtocv.entity';
import { User } from 'src/entity/user.entity';
import { getManager, getRepository, In } from 'typeorm';
import { UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserSession } from 'src/common/decorators/user.decorator';
import { UpCVDTO } from './upCV.dto';

@ApiTags('Apply')
@Controller('/api/v1/apply')
export class ApplyController {
    private readonly manager = getManager();
    

    /* Upload file */ 
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './uploads/fileupload',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
    )
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    upload(@UploadedFile() file) {
        console.log(file);
        return {
            url: `https://vietdanh.bike/fileupload/${file.filename}`,
        };
    }

    /* Fetch CV for user */
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/cv')
    async getCv(@UserSession() user: any) {
        try {
            const userId = user.users.id;
            const findeduser = await getRepository(User).findOne(userId, { relations: ["profile", "profile.cvs"] });
            // console.log(user);
            // const profile = await getRepository(Profile).findOne(user.profile, {relations: ["cvs"]});
            // console.log(profile);
            return findeduser.profile.cvs;
        }
        catch (err) {
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    /* Upload CV for user */
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('/cv')
    @UsePipes(new ValidationPipe({ transform: true }))
    async upCv(@UserSession() user: any, @Body() body: UpCVDTO) {
        try {
            console.log('co zo request')
            const userId = user.users.id;
            const cv = new CV();
            cv.name = body.name;
            cv.cvURL = body.cvURL;
            const findeduser: User = await getRepository(User).findOne(userId, { relations: ["profile"] });
            cv.profile = findeduser.profile;
            return await this.manager.save(cv);
        }
        catch (error) {
            console.log('err co loi', error)
            return new BadRequestException(JSON.stringify(error));
        }
    }

    /* Delete CV for user */
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('/cv/:CVid')
    async deleteCv(@Param('CVid') CVid: string) {
        try {
            const cv: CV = await getRepository(CV).findOne(CVid);
            const sjtc = await getRepository(JobToCv).find({ cvId: cv.id });
            if (sjtc.length) return "Applied cv cannot be delete";
            else return await getRepository(CV).delete(cv);
        }
        catch (err) {
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    /* Apply job */
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('/:jobId')
    async applyJob(@Param('jobId') jobId: string, @Body('cvId') cvId: string) {
        try {
            console.log(jobId, cvId);
            const appliedjob = await getRepository(JobToCv).findOne({ where: { jobId: jobId, cvId: cvId } });
            if (appliedjob) throw new ConflictException('Job already applied');
            const jobToCv = new JobToCv();
            const job = await getRepository(Job).findOne(jobId);
            const cv = await getRepository(CV).findOne(cvId, { relations: ["profile", "profile.user"] });
            jobToCv.job = job;
            jobToCv.cv = cv;
            await getRepository(AppliedJob).insert({ userId: cv.profile.user.id, jobId: job.id });
            return await this.manager.save(jobToCv);
        }
        catch (err) {
            console.error(err);
            throw new InternalServerErrorException();
        }
    }

    /* Get applied job by user */
    @Get('/:userId')
    async getAppliedJobsByUser(@Param('userId') userId: string) {
        const user: User = await getRepository(User).findOne(userId, { relations: ["profile", "profile.cvs"] });
        const cvs = user.profile.cvs;
        // console.log(cvs);
        // return cvs;
        // console.log(cvs[0]);
        console.log(cvs.map((cv) => cv.id));
        if (!cvs.length) return null;
        return await getRepository(JobToCv).find({ cvId: In(cvs.map((cv) => cv.id)) });
        // console.log(appliedJobs);
    }


}


