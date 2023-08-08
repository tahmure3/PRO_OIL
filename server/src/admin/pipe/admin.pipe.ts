import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RolesEnum } from 'src/common/enum/role.enum';

@Injectable()
export class ParseFindUsersPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const paramFilter = {};
    Object.keys(value).forEach(
      (key) => value[key] && (paramFilter[key] = value[key]),
    );
    return paramFilter;
  }
}

@Injectable()
export class ParseChangeRolePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.role.includes('') && value.role.length === 1)
      value.role = [RolesEnum.MEMBER];
    else value.role = [...value.role, RolesEnum.MEMBER];
    return value;
  }
}

@Injectable()
export class ParseIntAddProductPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    Object.keys(value).forEach((key) => {
      if (
        key === 'price' ||
        key === 'gain' ||
        key === 'stock' ||
        key === 'limit'
      ) {
        const number = parseInt(value[key]);
        if (!number) {
          throw new HttpException(
            `فرمت ارسالی ${key} Int نیست`,
            HttpStatus.BAD_REQUEST,
          );
        }
        value[key] = number;
      }
      if (key === 'SAE') {
        const sae: string = value[key];
        const arr = sae.split(/w( |-)?/);
        value[key] = arr[0] + 'w-' + arr[2];
      }
    });
    return value;
  }
}
