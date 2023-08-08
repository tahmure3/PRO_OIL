import { ISimpleReturn } from 'src/common/interface/returns.interface';
import { HttpStatus } from '@nestjs/common';

export interface IOtpReturnDTO extends ISimpleReturn {
  message: string;
  statusCode: HttpStatus;
  data: {
    otp?: string;
    expires: number;
  };
}

export interface IFastOtpReturnDTO extends ISimpleReturn {
  message: string;
  statusCode: HttpStatus;
  data: {
    expires: number;
    otp?: string;
  };
}

export interface ISignUpReturnDTO extends ISimpleReturn {
  message: string;
  statusCode: HttpStatus;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ISignInReturnDTO extends ISimpleReturn {
  message: string;
  statusCode: HttpStatus;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
