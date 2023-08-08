import { GenderEnum } from 'src/common/enum/gender.enum';
import { RolesEnum } from 'src/common/enum/role.enum';
import { ISimpleReturn } from 'src/common/interface/returns.interface';
import { HttpStatus } from '@nestjs/common';

export interface IFindUsersReturnDTO extends ISimpleReturn {
  message: string;
  statusCode: HttpStatus;
  data: [
    {
      _id: string;
      name: string;
      family: string;
      mobile: string;
      car: string;
      tag: string;
      city: string;
      role: Array<RolesEnum>;
      gender: GenderEnum;
    },
  ];
}

export interface IGetUsersReturnDTO extends ISimpleReturn {
  message: string;
  statusCode: HttpStatus;
  data: {
    admin: number;
    blogger: number;
    member: number;
    transfer: number;
    inTehran: number;
    outTehran: number;
    woman: number;
    man: number;
  };
}

export interface IChangeRoleReturnDTO extends ISimpleReturn {
  message: string;
  statusCode: HttpStatus;
  data: {};
}

export interface IAddProductReturnDTO extends ISimpleReturn {
}