import { RolesEnum } from 'src/common/enum/role.enum';

export interface IFindUserBodyDTO {
  name?: string;
  family?: string;
  mobile?: string;
  car?: string;
  tag?: string;
  city?: string;
  role?: Array<RolesEnum>;
}
