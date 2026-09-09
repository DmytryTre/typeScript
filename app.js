class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class Delivery {
    date;
    constructor(date) {
        this.date = date;
    }
}
class HomeDelivery extends Delivery {
    date;
    address;
    constructor(date, address) {
        super(date);
        this.date = date;
        this.address = address;
    }
}
class ShopDelivery extends Delivery {
    shopId;
    constructor(shopId) {
        super(new Date());
        this.shopId = shopId;
    }
}
class Cart {
    products = [];
    delivery;
    addProduct(product) {
        this.products.push(product);
    }
    deleteProduct(id) {
        this.products = this.products.filter((p) => p.id !== id);
    }
    getCartPrice() {
        return this.products.reduce((acc, p) => {
            acc + p.price;
            return acc;
        }, 0);
    }
    getProducts = () => this.products;
    setDelivery(homeOrShop) {
        this.delivery = homeOrShop;
    }
}
const cart = new Cart();
cart.addProduct(new Product(1, "Печенье", 10));
cart.addProduct(new Product(2, "Печенье", 1));
cart.addProduct(new Product(3, "Печенье", 20));
cart.setDelivery(new ShopDelivery("1"));
console.log(cart.getProducts(), cart.getCartPrice(), "price");
export {};
//# sourceMappingURL=app.js.map