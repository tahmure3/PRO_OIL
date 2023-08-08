import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


@Schema()
export class Data {
  @Prop({ type: Array<String> })
  company: [string];
}

export const DataSchema = SchemaFactory.createForClass(Data);
export type TypeDataSchema = HydratedDocument<Data>;