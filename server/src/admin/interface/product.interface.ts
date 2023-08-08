import { BaseOilEnum } from "src/common/enum/base-oil.enum";

export interface IAddProductBodyDTO {
  API: string;
  SAE: string;
  base: BaseOilEnum;
  name: string;
  title: string;
  company: string;
  description: string;
  gain: string | number;
  stock: string | number;
  limit: string | number;
  price: number | string;
  metaDescription: string;
  delivery: Array<string>;
}
