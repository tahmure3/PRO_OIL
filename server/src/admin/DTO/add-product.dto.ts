import { ApiProperty } from '@nestjs/swagger';
import { BaseOilEnum } from 'src/common/enum/base-oil.enum';

export class AddProductBody {
  @ApiProperty({
    description: 'the name of the product',
    minLength: 3,
    maxLength: 25,
    example: 'روغن اسپیدی 10w40',
    required: true,
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'the description of the product',
    minLength: 3,
    maxLength: 300,
    example: 'روغنی فر آوری شده با بهترین استاندارد ها',
    required: true,
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'the description of the product',
    minLength: 3,
    maxLength: 25,
    example: 'روغن اسپیدی 10w40',
    required: true,
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'the meta description of the product',
    minLength: 3,
    maxLength: 150,
    example: 'روغنی فر آوری شده با بهترین استاندارد ها',
    required: true,
    type: String,
  })
  metaDescription: string;

  @ApiProperty({
    description: 'the price of the product',
    minLength: 10000,
    maxLength: 1000000,
    example: '200000',
    required: true,
    type: String || Number,
  })
  price: number | string;

  @ApiProperty({
    description: 'the gain of the product',
    minLength: 5000,
    maxLength: 500000,
    example: '6000',
    required: true,
    type: String || Number,
  })
  gain: string | number;

  @ApiProperty({
    description: 'the API of the product',
    minLength: 2,
    maxLength: 2,
    example:
      'SN ro SM or SL or SJ or SH or SG or SF or SE or SD or SC or SB or SA',
    pattern: '/^(SN|SM|SL|SJ|SH|SG|SF|SE|SD|SC|SB|SA)$/',
    required: true,
    type: String,
  })
  API: string;

  @ApiProperty({
    description: 'the gain of the product',
    minLength: 3,
    maxLength: 8,
    example: '10w40 or 10w 40 or 10w-40',
    pattern: '/^[0-9]{1,2}w( |-)?[0-9]{1,2}$/',
    required: true,
    type: String,
  })
  SAE: string;

  @ApiProperty({
    description: 'the gain of the product',
    minLength: 1,
    maxLength: 1,
    example: `${BaseOilEnum.MINERAL} or ${BaseOilEnum.FULL_SYNTHETIC} or ${BaseOilEnum.SEMI_SYNTHETIC}`,
    required: true,
    enum: BaseOilEnum,
    type: BaseOilEnum,
  })
  base: BaseOilEnum;

  @ApiProperty({
    description: 'the number of the product stock',
    minLength: 0,
    maxLength: 100,
    example: '0-100',
    required: true,
    type: String || Number,
  })
  stock: string | number;

  @ApiProperty({
    description: 'the limit of the sale product',
    minLength: 1,
    maxLength: 50,
    example: '1-50',
    required: true,
    type: String || Number,
  })
  limit: string | number;

  @ApiProperty({
    description: 'the limit of the sale product',
    minLength: 3,
    maxLength: 25,
    example: '3-25',
    required: true,
    type: String,
  })
  company: string;

  @ApiProperty({
    description: 'the location of the delivery product',
    minLength: 1,
    maxLength: 35,
    example: '["حضوری", "تهران"]',
    required: true,
    type: Array<String>,
  })
  delivery: Array<string>;
}
