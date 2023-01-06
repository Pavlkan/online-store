import { Cart } from '../../model/Cart';
import { CartSummaryComponent } from '../../view/components/cart-summary/CartSummaryComponent';
import { BaseController } from '../BaseController';

export class CartSummaryController extends BaseController<CartSummaryComponent> {
    public component: CartSummaryComponent;

    constructor(cart: Cart) {
        super();
        this.component = new CartSummaryComponent(this, cart);
    }

    public remove(): void {
        this.component.beforeRemove();
    }
}
