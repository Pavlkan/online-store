import { Assortment } from './Assortment';
import { Observable } from './Observable';
import { Product } from './Product';

export type CartData = Map<Product, number>;

export class Cart extends Observable<CartData> {
    private readonly storageKey = 'cart';
    private assortment: Assortment;

    constructor(assortment: Assortment) {
        super(new Map());
        this.assortment = assortment;

        this.notify(this.extractData());
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

    public clearCart(): void {
        this.notify(new Map());
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

    public notify(data: CartData, compare?: boolean): void {
        this.persistData(data);
        super.notify(data, compare);
    }

    private persistData(data: CartData): void {
        const cart = Array.from(data).map(([product, count]) => [product.id, count]);
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }

    private extractData(): CartData {
        const rawCart = localStorage.getItem(this.storageKey);
        if (!rawCart) return new Map();
        const parsedCart = JSON.parse(rawCart).map(([id, count]: [number, number]) => {
            return [this.assortment.getProductById(id), count];
        });
        return new Map(parsedCart);
    }
}
