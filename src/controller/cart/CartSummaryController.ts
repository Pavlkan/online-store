import { Cart } from '../../model/Cart';
import { CartSummaryComponent } from '../../view/components/cart-summary/CartSummaryComponent';
import { Router } from '../../view/Router';
import { BaseController } from '../BaseController';

export class CartSummaryController extends BaseController<CartSummaryComponent> {
    public component: CartSummaryComponent;
    private cart: Cart;

    constructor(cart: Cart, router: Router) {
        super();
        this.cart = cart;
        this.component = new CartSummaryComponent(this, cart, router);
    }

    public remove(): void {
        this.component.beforeRemove();
    }
}
