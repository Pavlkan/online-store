import { Assortment } from './Assortment';
import { Observable } from './Observable';
import { Product } from './Product';

export type CartData = Map<Product, number>;

export class Cart extends Observable<CartData> {
    private readonly storageKey = 'cart';
    private assortment: Assortment;
    private promoCodeCoefficient!: number;

    constructor(assortment: Assortment) {
        super(new Map());
        this.assortment = assortment;
        this.initializePromoCodeCoefficient();

        this.notify(this.extractData());
    }

    public getStandartPrice(): number {
        let amount = 0;
        this.getData().forEach((quantity, product) => {
            amount += product.price * quantity;
        });
        return amount;
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

    public initializePromoCodeCoefficient(): void {
        this.promoCodeCoefficient = 0;
    }

    public addPromoCode(): void {
        this.promoCodeCoefficient += 10;
    }

    public removePromoCode(): void {
        this.promoCodeCoefficient -= 10;
    }

    public getAmount(): number {
        let amount = 0;
        this.getData().forEach((quantity, product) => {
            amount += product.price * quantity;
        });
        const promoCodeValue = this.getPromoCodeСoefficient();
        if (promoCodeValue > 0) {
            amount = Math.floor(amount - (amount / 100) * promoCodeValue);
        }
        return amount;
    }

    public getPromoCodeСoefficient(): number {
        return this.promoCodeCoefficient;
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
