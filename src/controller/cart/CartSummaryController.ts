import { Cart } from '../../model/Cart';
import { CartSummaryComponent } from '../../view/components/cart-summary/CartSummaryComponent';
import { Router } from '../../view/Router';
import { BaseController } from '../BaseController';

export class CartSummaryController extends BaseController<CartSummaryComponent> {
    public component: CartSummaryComponent;

    constructor(cart: Cart, router: Router) {
        super();
        this.component = new CartSummaryComponent(this, cart, router);
    }

    public remove(): void {
        this.component.beforeRemove();
    }
}
