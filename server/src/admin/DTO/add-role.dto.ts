import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { RolesChangeEnum } from 'src/common/enum/role-change.enum';
import { RolesEnum } from 'src/common/enum/role.enum';


export class ChangeRoleBody {
  @ApiProperty({
    description: 'the id of user to change roles',
    minLength: 24,
    maxLength: 24,
    example: 'vbndfguioertklqxcvjklert',
    required: true,
    type: String,
  })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'the birth date',
    minLength: 1,
    maxLength: 2,
    example: [RolesChangeEnum.BLOGGER, RolesEnum.TRANSFER],
    required: true,
    enum: RolesChangeEnum,
    type: Array,
  })
  role: Array<RolesChangeEnum>;
}