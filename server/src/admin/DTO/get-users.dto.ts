import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from 'src/common/enum/role.enum';

export class FindUsersQuery {
  @ApiProperty({
    description: 'the birth date',
    minLength: 2,
    maxLength: 15,
    example: 'hosein',
    required: false,
    type: String,
  })
  readonly name: string;

  @ApiProperty({
    description: 'the family of member',
    minLength: 2,
    maxLength: 20,
    example: 'jalali',
    required: false,
    type: String,
  })
  readonly family: string;

  @ApiProperty({
    description: 'the phone number',
    minLength: 11,
    maxLength: 11,
    example: '09*********',
    required: false,
    pattern: '/^09[0-9]{9}$/',
    type: String,
  })
  readonly mobile: string;

  @ApiProperty({
    description: 'the full name of the car',
    minLength: 3,
    maxLength: 30,
    example: '206 tu5',
    required: false,
    type: String,
  })
  readonly car: string;

  @ApiProperty({
    description: 'the car tag of member',
    minLength: 9,
    maxLength: 9,
    example: '12f123-12',
    required: false,
    pattern: '/^[0-9]{2}[\\u0600-\\u06FF]{1}[0-9]{3}-[0-9]{2}$/',
    type: String,
  })
  readonly tag: string;

  @ApiProperty({
    description: 'the family of member',
    minLength: 2,
    maxLength: 20,
    example: 'Rey',
    required: false,
    type: String,
  })
  readonly city: string;

  @ApiProperty({
    description: 'the role of member',
    required: false,
    example: RolesEnum.ADMIN,
    type: Array<RolesEnum>,
  })
  readonly role: Array<RolesEnum>;
}