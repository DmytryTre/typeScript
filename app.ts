import sortBy from "sort-by";
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

interface IForm {
  name: string;
  password: string;
}

const form: IForm = {
  name: "Вася",
  password: "123",
};

type ModifiredFormToValidation<T> = {
  [Property in keyof T]:
    | { isValid?: true }
    | { isValid: false; errorMessage: string };
};

const formValidation: ModifiredFormToValidation<IForm> = {
  name: { isValid: true },
  password: {
    isValid: false,
    errorMessage: "Пароль должен быть длиннее 5 символов",
  },
};

const getValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
type Coordinate = [number, string, boolean];
type Head<T> = T extends [infer First, ...unknown[]] ? First : never;
const first: Head<Coordinate> = 42;

interface IUserService {
  users: number;
  getUsersInDatabase(): number;
}

function CreatedAt(t: new (...args: any[]) => {}) {
  return class extends t {
    createdAt = new Date();
  };
}

const products = [
  { id: 1, name: "Смартфон", category: "Электроника", price: 50000 },
  { id: 2, name: "Ноутбук", category: "Электроника", price: 90000 },
  { id: 3, name: "Чайник", category: "Бытовая техника", price: 3000 },
  {
    id: 4,
    name: "Планшет",
    category: "Электроника",
    price: { id: 1, name: "Смартфон", category: "Электроника", price: 50000 },
  },
];

const cheapFirst = products.sort(sortBy("price"));
