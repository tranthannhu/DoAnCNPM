import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  Put,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthServices } from './auth.service';
import {
  LoginDTO,
  ChangePwdDTO,
  UpdatePhoneNumber,
  UploadAvatar,
} from 'src/App/auth/auth.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSession } from 'src/common/decorators/user.decorator';
import { Methods } from 'src/common/decorators/method.decorator';
import { methodEnum } from 'src/common/enums/method.enum';
import { Modules } from 'src/common/decorators/module.decorator';
import { ModuleEnum } from 'src/common/enums/module.enum';
import { PossessionGuard } from 'src/guards/posessionHandle.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AppToken } from 'src/entity/app_token.entity';
import { getManager, getRepository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@ApiTags('v1/auth')
@Controller('api/v1/auth')
@Modules(ModuleEnum.PROFILE)
export class AuthController {
  constructor(private authService: AuthServices) {}

  @Get()
  // @UseGuards(AuthGuard)
  getRoleByUser(id: string) {
    return this.authService.getRolesPermission(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async Login(@Body() data: LoginDTO) {
    const result = await this.authService.login(data);
    return result;
  }

  

  @Put('me/password')
  @Methods(methodEnum.UPDATE)
  @UsePipes(new ValidationPipe())
  async changePwd(@Body() body: ChangePwdDTO, @UserSession() user) {
    return this.authService.changePwd(user, body);
  }

  @Put('me/avatar')
  @Methods(methodEnum.UPDATE)
  @UsePipes(new ValidationPipe())
  async uploadAvatar(@Body() body: UploadAvatar, @UserSession() user) {
    console.log(body);
    return this.authService.uploadAvatar(user.users.id, body);
  }

  @Patch('me/phone')
  @Methods(methodEnum.UPDATE)
  @UsePipes(new ValidationPipe())
  async updatePhoneNumber(
    @Body() body: UpdatePhoneNumber,
    @UserSession() user,
  ) {
    return await this.authService.updatePhoneNumber(body, user.users.id);
  }

  @Get('me')
  @Methods(methodEnum.READ)
  @UseGuards(PossessionGuard)
  async getProfile(@UserSession() user: any) {
    
    const { id } = user.users;
    return await this.authService.getProfile(id);
  }

  @Get('me/recently')
  @Methods(methodEnum.READ)
  @UseGuards(PossessionGuard)
  async getRecently(@UserSession() user: any) {
    const { id } = user.users;
    return await this.authService.getRecently(id);
  }

  /* Register App Token */
  @Post('appToken')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async registerAppToken(@UserSession() user, @Body('appToken') appToken: string) {
    const userId: string = user.users.id;
    const foundUser = await getRepository(User).findOne(userId);
    const aToken = new AppToken();
    aToken.token = appToken;
    aToken.user = foundUser;
    const res = await getManager().save(aToken);
    return res;
  }
}
