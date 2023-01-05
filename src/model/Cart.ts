import { Observable } from './Observable';
import { Product } from './Product';

export type CartData = Map<Product, number>;

export class Cart extends Observable<CartData> {
    constructor() {
        super(new Map());
    }

    public addToCart(product: Product): void {
        const updatedCart = new Map(this.getData().set(product, 1));
        this.notify(updatedCart);
    }

    public removeFromCart(product: Product): void {
        this.getData().delete(product);
        this.notify(new Map(this.getData()));
    }

    public changeProductQuantity(product: Product, quantity: number): void {
        if (quantity > product.stock || quantity < 0) return;
        if (quantity === 0) {
            this.removeFromCart(product);
        } else {
            this.getData().set(product, quantity);
        }
        this.notify(new Map(this.getData()));
    }

    public getAmount(): number {
        let amount = 0;
        this.getData().forEach((quantity, product) => {
            amount += product.price * quantity;
        });
        return amount;
    }

    public getProductsQuantity(): number {
        let totalQuantity = 0;
        this.getData().forEach((productQuantity) => {
            totalQuantity += productQuantity;
        });
        return totalQuantity;
    }
}
