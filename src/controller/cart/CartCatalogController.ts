import { Cart } from '../../model/Cart';
import { CartPagination } from '../../model/CartPagination';
import { Product } from '../../model/Product';
import { CartCatalogComponent } from '../../view/components/cart-catalog/CartCatalogComponent';
import { Router } from '../../view/Router';
import { BaseController } from '../BaseController';

export class CartCatalogController extends BaseController<CartCatalogComponent> {
    public component: CartCatalogComponent;
    private cart: Cart;
    private cartPagination: CartPagination;

    constructor(cart: Cart, router: Router, cartPagination: CartPagination) {
        super();
        this.cart = cart;
        this.cartPagination = cartPagination;
        this.component = new CartCatalogComponent(this, cart, router, cartPagination);
    }

    public remove(): void {
        this.component.beforeRemove();
    }

    public updatePagination(page: number, limit: number): void {
        this.cartPagination.touch();
        this.cartPagination.update({ page, limit });
    }

    public changeProductQuantity(product: Product, quantity: number): void {
        this.cart.changeProductQuantity(product, quantity);
    }
}
