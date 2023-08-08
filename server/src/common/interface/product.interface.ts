export interface IProductModel extends Document {
  name: string;
  description: string;
  title: string;
  metaDescription: string;
  price: number;
  gain: number;
  API: string;
  SAE: string;
  base: string;
  stock: number;
  limit: number;
  company: string;
  delivery: Array<string>;
  image: Array<string>;
}
