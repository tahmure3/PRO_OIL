import { HttpStatus } from '@nestjs/common';
import { ISimpleReturn } from 'src/common/interface/returns.interface';

export interface IRefreshTokenReturnDTO extends ISimpleReturn {
  message: string;
  statusCode: HttpStatus;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
