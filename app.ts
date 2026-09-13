class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
  ) {}
}

class Delivery {
  constructor(public date: Date) {}
}

class HomeDelivery extends Delivery {
  constructor(
    public date: Date,
    public address: string,
  ) {
    super(date);
  }
}

type ShopId = string;
class ShopDelivery extends Delivery {
  constructor(public shopId: ShopId) {
    super(new Date());
  }
}

type DeliveryOpt = HomeDelivery | ShopDelivery;

class Cart {
  private products: Product[] = [];
  private delivery: DeliveryOpt;

  addProduct(product: Product): void {
    this.products.push(product);
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id);
  }

  getCartPrice(): number {
    return this.products.reduce((acc, p) => {
      acc + p.price;
      return acc;
    }, 0);
  }

  getProducts = (): Product[] => this.products;

  setDelivery(homeOrShop: DeliveryOpt): void {
    this.delivery = homeOrShop;
  }
}

const cart = new Cart();

cart.addProduct(new Product(1, "Печенье", 10));
cart.addProduct(new Product(2, "Печенье", 1));
cart.addProduct(new Product(3, "Печенье", 20));
cart.setDelivery(new ShopDelivery("1"));

console.log(cart.getProducts(), cart.getCartPrice(), "price");

const convertToString = <T>(item: T) => {
  if (!!item) {
    if (typeof item === "object") {
      return JSON.stringify(item);
    }
  }

  return null;
};
