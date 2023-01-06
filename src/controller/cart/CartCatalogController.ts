import { Cart } from '../../model/Cart';
import { Product } from '../../model/Product';
import { CartCatalogComponent } from '../../view/components/cart-catalog/CartCatalogComponent';
import { Router } from '../../view/Router';
import { BaseController } from '../BaseController';

export class CartCatalogController extends BaseController<CartCatalogComponent> {
    public component: CartCatalogComponent;
    private cart: Cart;

    constructor(cart: Cart, router: Router) {
        super();
        this.cart = cart;
        this.component = new CartCatalogComponent(this, cart, router);
    }

    public remove(): void {
        this.component.beforeRemove();
    }

    public changeProductQuantity(product: Product, quantity: number): void {
        this.cart.changeProductQuantity(product, quantity);
    }
}
