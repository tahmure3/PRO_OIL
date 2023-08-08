import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  IRefreshTokenBodyDTO,
  IRefreshTokenModel,
  IRefreshTokenModelDTO,
} from '../interface/refresh-token.interface';
import { Model } from 'mongoose';
import { Jwt } from 'src/utils/jwt';
import { JwtService } from '@nestjs/jwt';
import {
  ISignUpModel,
  ISignUpModelDTO,
} from 'src/viewer/interface/sign-up.interface';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    @Inject('REFRESH_TOKEN_MODEL')
    private readonly refreshTokenModel: Model<IRefreshTokenModel>,
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshTokenBody: IRefreshTokenBodyDTO = request.body;
    let { refreshToken }: { refreshToken: string } = refreshTokenBody;
    const [bearer, tokenBody] = refreshToken.split(' ');
    if (bearer !== 'Bearer') {
      throw new HttpException('خطا در نحوه ارسال توکن', HttpStatus.BAD_REQUEST);
    }
    refreshToken = tokenBody; 
    console.log(refreshToken)
    const existingRefreshToken: IRefreshTokenModelDTO =
      await this.refreshTokenModel.findOne({
        refreshToken,
      });
    if (!existingRefreshToken) {
      throw new HttpException(
        '1کاربری یافت نشد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const token = new Jwt(this.jwtService);
    const { mobile, expires, correct } = await token.decodeToken(refreshToken);
    if (!correct) {
      throw new HttpException(
        'توکن وجود ندارد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const now = new Date().getTime();
    if (now - expires < 0) {
      throw new HttpException('توکن منقضی نشده', HttpStatus.BAD_REQUEST);
    }
    const existingMember: ISignUpModelDTO = await this.signUpModel.findById(
      existingRefreshToken.id,
    );
    if (!existingMember) {
      throw new HttpException(
        'کاربری یافت نشد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (existingMember.mobile !== mobile) {
      throw new HttpException(
        'کاربری یافت نشد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return true;
  }
}
