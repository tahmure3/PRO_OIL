import { HttpStatus } from '@nestjs/common';

export interface ISimpleReturn {
  message: string;
  statusCode: HttpStatus;
  data?: {};
}
