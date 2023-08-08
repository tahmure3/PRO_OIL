import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { IRefreshTokenModel } from 'src/token/interface/refresh-token.interface';
import { IRefreshTokenBodyDTO } from './interface/refresh-token.interface';
import { Jwt } from 'src/utils/jwt';
import { JwtService } from '@nestjs/jwt';
import { IRefreshTokenReturnDTO } from './interface/return.interface';

@Injectable()
export class TokenService {
  constructor(
    @Inject('REFRESH_TOKEN_MODEL')
    private readonly refreshTokenModel: Model<IRefreshTokenModel>,
    private readonly jwtService: JwtService,
  ) {}
  async refreshToken(
    refreshTokenBody: IRefreshTokenBodyDTO,
  ): Promise<IRefreshTokenReturnDTO> {
    const returnMes: IRefreshTokenReturnDTO = {
      statusCode: HttpStatus.ACCEPTED,
      message: 'رفرش توکن ارسال شد',
      data: {
        accessToken: '',
        refreshToken: '',
      },
    };
    const token = new Jwt(this.jwtService);
    const [bearer, tokenBody] = refreshTokenBody.refreshToken.split(' ');
    const { mobile, name } = await token.decodeToken(tokenBody);
    const { accessToken, refreshToken } = await token.createToken(mobile, name);
    await this.refreshTokenModel.updateOne(
      { refreshToken: tokenBody },
      { refreshToken },
    );
    returnMes.data = { accessToken, refreshToken };
    return returnMes;
  }
}
