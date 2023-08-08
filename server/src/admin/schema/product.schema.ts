import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as Joi from 'joi';
import { join } from 'path';
import { ConstantsEnum } from 'src/common/enum/constants.enum';

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  metaDescription: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  gain: number;

  @Prop({ required: true })
  API: string;

  @Prop({ required: true })
  SAE: string;

  @Prop({ required: true })
  base: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  limit: number;

  @Prop({ required: true })
  company: string;

  @Prop({ default: ['حضوری'] })
  delivery: Array<string>;

  @Prop({ default: [ConstantsEnum.PATH_IMAGE_PRODUCT] })
  image: Array<string>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type TypeProductSchema = HydratedDocument<Product>;

//__________________________________________

export const addProductSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .message('فیلد نام روغن کمتر از ۳ حرف پذیرفته نیست')
    .max(25)
    .message('فیلد نام روغن بیشتر از ۲۵ حرف پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد نام روغن وجود ندارد' }),

  description: Joi.string()
    .trim()
    .min(3)
    .message('فیلد توضیح کمتر از ۳ حرف پذیرفته نیست')
    .max(300)
    .message('فیلد توضیح بیشتر از ۳۰۰ حرف پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد توضیح وجود ندارد' }),

  title: Joi.string()
    .trim()
    .min(3)
    .message('فیلد موضوع جستوجوگر کمتر از ۳ حرف پذیرفته نیست')
    .max(25)
    .message('فیلد موضوع جستوجوگر بیشتر از ۲۵ حرف پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد موضوع جستوجوگر وجود ندارد' }),

  metaDescription: Joi.string()
    .trim()
    .min(3)
    .message('فیلد توضیح جستوجوگر کمتر از ۳ حرف پذیرفته نیست')
    .max(150)
    .message('فیلد توضیح جستوجوگر بیشتر از ۱۵۰ حرف پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد توضیح جستوجوگر وجود ندارد' }),

  price: Joi.number()
    .min(10000)
    .message('فیلد قیمت کمتر از 10000 هزار تومان پذیرفته نیست')
    .max(1000000)
    .message('فیلد قیمت بیشتر از 1000000 هزار تومان پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد قیمت وجود ندارد' }),

  gain: Joi.number()
    .min(5000)
    .message('فیلد سود کمتر از 5000 هزار تومان پذیرفته نیست')
    .max(500000)
    .message('فیلد سود بیشتر از 500000 هزار تومان پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد سود وجود ندارد' }),

  API: Joi.string()
    .trim()
    .length(2)
    .message('فیلد API خارج از ۲ حرف پذیرفته نیست')
    .pattern(/^(SN|SM|SL|SJ|SH|SG|SF|SE|SD|SC|SB|SA)$/)
    .message('فیلد API صحیح نیست')
    .required()
    .messages({ 'any.required': 'فیلد API وجود ندارد' }),

  SAE: Joi.string()
    .trim()
    .min(3)
    .message('فیلد SAE کمتر از ۳ حرف پذیرفته نیست')
    .max(8)
    .message('فیلد SAE بیشتر از ۸ حرف پذیرفته نیست')
    .pattern(/^[0-9]{1,2}w( |-)?[0-9]{1,2}$/)
    .message('فرمت فیلد SAE صحیح نیست')
    .required()
    .messages({ 'any.required': 'فیلد SAE وجود ندارد' }),

  base: Joi.string()
    .trim()
    .min(6)
    .message('فیلد اساس ساخت روغن کمتر از ۶ حرف پذیرفته نیست')
    .max(11)
    .message('فیلد اساس ساخت روغن بیشتر از ۱۱ حرف پذیرفته نیست')
    .pattern(/^[\u0600-\u06FF\s]{6,11}/)
    .message('زبان تایپ فارسی نیست')
    .required()
    .messages({ 'any.required': 'فیلد اساس ساخت روغن وجود ندارد' }),

  stock: Joi.number()
    .min(0)
    .message('فیلد موجودی کمتر از ۰ حرف پذیرفته نیست')
    .max(100)
    .message('فیلد موجودی بیشتر از ۱۰۰ حرف پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد موجودی وجود ندارد' }),

  limit: Joi.number()
    .min(1)
    .message('فیلد محدودیت فروش کمتر از ۱ حرف پذیرفته نیست')
    .max(50)
    .message('فیلد محدودیت فروش بیشتر از ۵۰ حرف پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد محدودیت فروش وجود ندارد' }),

  company: Joi.string()
    .trim()
    .min(3)
    .message('فیلد شرکت کمتر از ۳ حرف پذیرفته نیست')
    .max(25)
    .message('فیلد شرکت بیشتر از ۲۵ حرف پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد شرکت وجود ندارد' }),

  delivery: Joi.array()
    .items(
      Joi.string()
        .trim()
        .min(2)
        .message('فیلد تحویل کمتر از ۲ حرف پذیرفته نیست')
        .max(20)
        .message('فیلد تحویل بیشتر از ۲۰ حرف پذیرفته نیست')
        .pattern(/^[\u0600-\u06FF\s]{2,20}/)
        .message('زبان تایپ فارسی نیست')
        .required()
        .messages({ 'any.required': 'فیلد تحویل وجود ندارد' }),
    )
    .min(1)
    .message('فیلد تحویل کمتر از ۱ عضو پذیرفته نیست')
    .max(35)
    .message('فیلد تحویل بیشتر از ۳۵ عضو پذیرفته نیست')
    .required()
    .messages({ 'any.required': 'فیلد تحویل وجود ندارد' }),
});

//__________________________________________

export const editProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  title: Joi.string(),
  metaDescription: Joi.string(),
  price: Joi.number(),
  gain: Joi.number(),
  API: Joi.string(),
  SAE: Joi.string(),
  base: Joi.string(),
  stock: Joi.number(),
  limit: Joi.number(),
});
