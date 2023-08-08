import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { HydratedDocument } from 'mongoose';
import { RolesEnum } from 'src/common/enum/role.enum';

export const signUpSchema = Joi.object({
  mobile: Joi.string()
    .trim()
    .length(11)
    .message('تعداد ارقام تلفن صحیح نیست')
    .pattern(/^09[0-9]{9}$/)
    .message('شکل تلفن صحیح نیست')
    .required()
    .messages({ 'any.required': 'فیلد موبایل وجود ندارد' }),

  car: Joi.string()
    .trim()
    .min(3)
    .message('اندازه نام ماشین صحیح نیست')
    .max(30)
    .message('اندازه نام ماشین صحیح نیست')
    .required()
    .messages({ 'any.required': 'فیلد نام ماشین وجود ندارد' }),

  tag: Joi.string()
    .trim()
    .length(9)
    .message('محتوا پلاک کامل نیست')
    .pattern(/^[0-9]{2}[\u0600-\u06FF]{1}[0-9]{3}-[0-9]{2}$/)
    .message('فرمت پلاک صحبح نیست')
    .required()
    .messages({ 'any.required': 'فیلد پلاک وجود ندارد' }),

  gmail: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9_.+-]+@(gmail|yahoo).*\.[a-zA-Z]{2,6}$/)
    .message('فرمت جیمیل صحیح نیست')
    .required()
    .messages({ 'any.required': 'فیلد جیمیل وجود ندارد' }),

  password: Joi.string()
    .trim()
    .min(5)
    .message('تعداد حروف صحیح نیست')
    .max(35)
    .message('تعداد حروف صحیح نیست')
    .pattern(/^([a-z]|[A-Z])(\w|#|&|%|@|\$){5,}$/)
    .message('فرمت رمز عبور اشتباه است')
    .required()
    .messages({ 'any.required': 'فیلد رمز عبور وجود ندارد' }),

  otp: Joi.string()
    .trim()
    .length(6)
    .message('تعداد اعداد صحیح نمی باشد')
    .pattern(/^[0-9]{6}$/)
    .message('محتوا ارسالی صحبح نمی باشد')
    .required()
    .messages({ 'any.required': 'فیلد کد احراز هویت وجود ندارد' }),

  name: Joi.string()
    .trim()
    .min(2)
    .message('نام کمتر از ۲ حرف پذیرفته نیست')
    .max(15)
    .message('نام بیشتر از ۱۵ حرف پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد نام وجود ندارد' }),

  family: Joi.string()
    .trim()
    .min(2)
    .message('نام خانوادگی کمتر از ۲ حرف پذیرفته نیست')
    .max(20)
    .message('نام خانوادگی بیشتر از ۲۰ حرف پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد نام خانوادگی وجود ندارد' }),

  gender: Joi.string()
    .trim()
    .length(1)
    .message('تعداد حروف پذیرفته نیست')
    .pattern(/^(M|W)$/)
    .message('فرمت ارسالی جنسیت صحیح نمی باشد')
    .required()
    .messages({ 'any.required': 'فیلد جنسیت وجود ندارد' }),
});

@Schema()
export class SignUp {
  @Prop({ default: 'Nam-unknown' })
  name: string;

  @Prop({ default: 'Fam-unknown' })
  family: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  nationalCode: string;

  @Prop({ required: true })
  car: string;

  @Prop({ required: true })
  tag: string;

  @Prop({ required: true })
  gmail: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  cash: number;

  @Prop({ default: [] })
  bills: Array<string>;

  @Prop({ default: [] })
  discountCode: Array<string>;

  @Prop({ default: [] })
  recentTransactions: Array<Object>;

  @Prop({ default: '' })
  province: string;

  @Prop({ default: '' })
  city: string;

  @Prop({ default: '' })
  birthDate: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  postalCode: string;

  @Prop({ default: '' })
  serial: string;

  @Prop({ default: [RolesEnum.MEMBER] })
  role: Array<string>;

  @Prop({ default: 'm', required: true })
  gender: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const SignUpSchema = SchemaFactory.createForClass(SignUp);
export type TypeSignUpSchema = HydratedDocument<SignUp>;