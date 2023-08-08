import * as Joi from 'joi';

export const changeRoleSchema = Joi.object({
  userId: Joi.string()
    .min(24)
    .message('شناسه کاربر کمتر از ۲۴ حرف پذیرفته نیست')
    .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
    .message('فرمت توکن صحیح نیست')
    .required()
    .messages({ 'any.required': 'فیلد شناسه کاربر وجود ندارد' }),

  role: Joi.array()
    .required().items(Joi.string().required())
    .messages({ 'any.required': 'فیلد وظیفه وجود ندارد' }),
});
