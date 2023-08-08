import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { BaseOilEnum } from 'src/common/enum/base-oil.enum';
import { RolesEnum } from 'src/common/enum/role.enum';
import { IDataModel } from 'src/common/interface/data.interface';
import { IProductModel } from 'src/common/interface/product.interface';
import { Jwt } from 'src/utils/jwt';
import {
  ISignUpModel,
  ISignUpModelDTO,
} from 'src/viewer/interface/sign-up.interface';
import { IAddProductBodyDTO } from '../interface/product.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let { accesstoken: accessToken } = request.headers;
    if (!accessToken) {
      throw new HttpException('توکن وجود ندارد', HttpStatus.BAD_REQUEST);
    }
    const [bearer, tokenBody] = accessToken.split(' ');
    if (bearer !== 'Bearer') {
      throw new HttpException('خطا در ارسال توکن', HttpStatus.BAD_REQUEST);
    }
    accessToken = tokenBody;
    const token = new Jwt(this.jwtService);
    const { correct, expires, mobile, name } = await token.decodeToken(
      accessToken,
    );
    if (name) {
      throw new HttpException('خطا در ارسال توکن', HttpStatus.BAD_REQUEST);
    } else if (!correct) {
      throw new HttpException(
        'توکن وجود ندارد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const now = new Date().getTime();
    if (now - expires > 0) {
      throw new HttpException('توکن منقضی شده', HttpStatus.GATEWAY_TIMEOUT);
    }
    const existingAdmin: ISignUpModelDTO = await this.signUpModel.findOne({
      mobile,
    });
    if (!existingAdmin) {
      throw new HttpException(
        'کاربری یافت نشد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!existingAdmin.role.includes(RolesEnum.ADMIN)) {
      throw new HttpException(
        'دسترسی به این قسمت وجود ندارد',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return true;
  }
}

@Injectable()
export class FindUsersGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;
    const AccessKeys = [
      'name',
      'family',
      'mobile',
      'car',
      'tag',
      'city',
      'role',
      'gender',
    ];
    const keysQuery = Object.keys(query);
    keysQuery.forEach((key) => {
      if (!AccessKeys.includes(key)) {
        throw new HttpException(`${key} پذیرفته نیست`, HttpStatus.BAD_REQUEST);
      }
    });
    return true;
  }
}

@Injectable()
export class AddRoleGuard implements CanActivate {
  constructor(
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId, role }: { userId: string; role: Array<string> } =
      request.body;
    const valueRole = Object.keys(RolesEnum).filter(
      (role) => role !== RolesEnum.ADMIN && role !== RolesEnum.MEMBER,
    );
    let existingUser;
    if (role && userId) {
      try {
        existingUser = await this.signUpModel.findById(userId);
      } catch (error) {}
      if (!existingUser) {
        throw new HttpException(`کاربری یافت نشد`, HttpStatus.BAD_REQUEST);
      }
      if (role.includes('') && role.length <= 1) {
        if (existingUser.role[0] === RolesEnum.MEMBER) {
          throw new HttpException(
            `تغییر وظایف وجود ندارد`,
            HttpStatus.BAD_REQUEST,
          );
        }
        return true;
      }
      role.forEach((key) => {
        if (!valueRole.includes(key)) {
          throw new HttpException(
            `${key} پذیرفته نیست`,
            HttpStatus.BAD_REQUEST,
          );
        }
      });
      const a = [RolesEnum.MEMBER, ...role].sort();
      const b = [...existingUser.role].sort();
      if (a.length === b.length) {
        for (let i in a) {
          if (a[i] === b[i])
            throw new HttpException(
              `تغییر وظایف وجود ندارد`,
              HttpStatus.BAD_REQUEST,
            );
        }
      }
      if (existingUser.role.includes(RolesEnum.ADMIN)) {
        throw new HttpException(
          `ادمین دسترسی به این قسمت ندارد`,
          HttpStatus.EXPECTATION_FAILED,
        );
      }
    }
    return true;
  }
}

@Injectable()
export class AddProductGuard implements CanActivate {
  constructor(
    @Inject('DATA_MODEL') private readonly dataModel: Model<IDataModel>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { company, base, API, SAE }: IAddProductBodyDTO = request.body;
    if (!company) {
      return true;
    }
    if (!Object.values(BaseOilEnum).includes(base)) {
      throw new HttpException(
        `${base}در لیست پایه ساخت نیست`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const data: any = await this.dataModel.findOne({}, { _id: 0, __v: 0 });
    if (!data) {
      throw new HttpException(
        `موردی در لیست شرکت ها نیست`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const companies: Array<string> = data.company;
    if (!companies.includes(company)) {
      throw new HttpException(
        `${company} در لیست شرکت ها نیست`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
