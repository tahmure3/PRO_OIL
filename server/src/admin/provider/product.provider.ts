import { Mongoose } from 'mongoose';
import { ProductSchema } from '../schema/product.schema';
import { DataSchema } from '../schema/data.schema';

export const productProvider = [
  {
    provide: 'PRODUCT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('products', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const dataProvider = [
  {
    provide: 'DATA_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('data', DataSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
