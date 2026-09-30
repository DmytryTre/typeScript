import { HttpMethod, RequestBuilder } from "../12-builder/builder.js";

interface IDummyApi {
  getDummyProduct(id: number): Promise<IDummyProduct | undefined>;
}

interface IDimensions {
  width: number;
  height: number;
  depth: number;
}

interface IReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface IMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface IDummyProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: IDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IMeta;
  images: string[];
  thumbnail: string;
}

class DummyAPI implements IDummyApi {
  private data: IDummyProduct | null = null;

  public async getDummyProduct(id: number): Promise<IDummyProduct | undefined> {
    try {
      const product = await new RequestBuilder()
        .setUrl(`https://dummyjson.com/products/${id}`)
        .setMethod(HttpMethod.Get)
        .exec<IDummyProduct>();

      this.data = product;
      return product;
    } catch (error) {
      console.error(`Не удалось загрузить продукт с id ${id}:`, error);
      return undefined;
    }
  }
}

class DummyAccessProxy implements IDummyApi {
  constructor(
    private api: IDummyApi,
    private productId: number,
  ) {}

  public async getDummyProduct(id: number): Promise<IDummyProduct | undefined> {
    if (id > 10) {
      console.error(
        `Доступ запрещен: id ${id} должен быть меньше или равен 10`,
      );
      return undefined;
    }
    return this.api.getDummyProduct(id);
  }
}
