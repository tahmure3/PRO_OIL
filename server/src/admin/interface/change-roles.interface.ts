import { Types } from 'mongoose';
import { RolesChangeEnum } from 'src/common/enum/role-change.enum';

export interface IChangeRolesBodyDTO {
  userId: Types.ObjectId;
  role: Array<RolesChangeEnum>;
}
