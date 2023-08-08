import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ISignUpModel } from 'src/viewer/interface/sign-up.interface';
import { IFindUserBodyDTO } from './interface/find-users.interface';
import {
  IAddProductReturnDTO,
  IChangeRoleReturnDTO,
  IFindUsersReturnDTO,
  IGetUsersReturnDTO,
} from './interface/return.interface';
import { GenderEnum } from 'src/common/enum/gender.enum';
import { RolesEnum } from 'src/common/enum/role.enum';
import { MemberController } from 'src/member/member.controller';
import { ProvincesEnum } from 'src/common/enum/province.enum';
import { IChangeRolesBodyDTO } from './interface/change-roles.interface';
import { IDataModel } from 'src/common/interface/data.interface';
import { IProductModel } from 'src/common/interface/product.interface';
import { IAddProductBodyDTO } from './interface/product.interface';

@Injectable()
export class AdminService {
  constructor(
    @Inject('SIGNUP_MODEL') private readonly signUpModel: Model<ISignUpModel>,
    @Inject('DATA_MODEL') private readonly dataModel: Model<IDataModel>,
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<IProductModel>,
  ) {}
  async changeRoles(addRolesBody: IChangeRolesBodyDTO) {
    const returnMes: IChangeRoleReturnDTO = {
      statusCode: HttpStatus.ACCEPTED,
      message: 'وظایف کاربر تغییر کرد',
      data: { newRole: addRolesBody.role },
    };
    await this.signUpModel.updateOne(
      { _id: addRolesBody.userId },
      { role: addRolesBody.role },
    );
    return returnMes;
  }

  async addProduct(
    productBody: IAddProductBodyDTO,
  ): Promise<IAddProductReturnDTO> {
    const returnMes: IAddProductReturnDTO = {
      statusCode: HttpStatus.CREATED,
      message: 'محصول به لیست محصولات اضافه شد',
    };
    const {
      API,
      SAE,
      base,
      company,
      delivery,
      description,
      gain,
      limit,
      metaDescription,
      name,
      price,
      stock,
      title,
    } = productBody;
    const existing = await this.productModel.findOne({
      company,
      base,
      API,
      SAE,
    });
    if (existing) {
      throw new HttpException('محصول تکراری است', HttpStatus.BAD_REQUEST);
    }
    await new this.productModel({
      API,
      SAE,
      base,
      company,
      delivery,
      description,
      gain,
      limit,
      metaDescription,
      name,
      price,
      stock,
      title,
    }).save();
    return returnMes;
  }

  async addCompany(company) {
    console.log(company);
    await new this.dataModel({ company: [company.name] }).save();
  }

  async getUsers(): Promise<IGetUsersReturnDTO> {
    const returnMes: IGetUsersReturnDTO = {
      statusCode: HttpStatus.FOUND,
      message: 'لیست آمار کاربران',
      data: {
        admin: 0,
        blogger: 0,
        member: 0,
        transfer: 0,
        inTehran: 0,
        outTehran: 0,
        woman: 0,
        man: 0,
      },
    };
    const result: any = await this.signUpModel.find(
      {},
      {
        _id: 0,
        password: 0,
        nationalCode: 0,
        discountCode: 0,
        birthDate: 0,
        gmail: 0,
        cash: 0,
        address: 0,
        city: 0,
        recentTransactions: 0,
        postalCode: 0,
        serial: 0,
        createdAt: 0,
        updatedAt: 0,
        bills: 0,
        name: 0,
        family: 0,
        car: 0,
        mobile: 0,
        tag: 0,
        __v: 0,
      },
    );
    result.forEach((member) => {
      member.province === ProvincesEnum.TEHRAN
        ? (returnMes.data.inTehran += 1)
        : (returnMes.data.outTehran += 1);
      member.role.includes(RolesEnum.ADMIN) && (returnMes.data.admin += 1);
      member.role.includes(RolesEnum.TRANSFER) &&
        (returnMes.data.transfer += 1);
      member.role.includes(RolesEnum.BLOGGER) && (returnMes.data.blogger += 1);
      member.role.includes(RolesEnum.MEMBER) && (returnMes.data.member += 1);
      member.gender === GenderEnum.MAN && (returnMes.data.man += 1);
      member.gender === GenderEnum.WOMAN && (returnMes.data.woman += 1);
    });
    return returnMes;
  }

  async findUsers(
    findUserBody: IFindUserBodyDTO,
  ): Promise<IFindUsersReturnDTO> {
    const returnMes: IFindUsersReturnDTO = {
      statusCode: HttpStatus.FOUND,
      message: 'کاربران یافت شده',
      data: [
        {
          _id: '',
          car: '',
          city: '',
          name: '',
          family: '',
          mobile: '',
          tag: '',
          role: [RolesEnum.MEMBER],
          gender: GenderEnum.MAN,
        },
      ],
    };
    const result: any = await this.signUpModel.find(findUserBody, {
      password: 0,
      nationalCode: 0,
      discountCode: 0,
      birthDate: 0,
      gmail: 0,
      cash: 0,
      address: 0,
      province: 0,
      recentTransactions: 0,
      postalCode: 0,
      serial: 0,
      createdAt: 0,
      updatedAt: 0,
      bills: 0,
      __v: 0,
    });
    returnMes.data = result;
    return returnMes;
  }
}
