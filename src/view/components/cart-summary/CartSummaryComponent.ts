import { CartSummaryController } from '../../../controller/cart/CartSummaryController';
import { Cart } from '../../../model/Cart';
import { BaseComponent } from '../../BaseComponent';

interface CartSummaryComponentProps {
    controller: CartSummaryController;
    cart: Cart;
}

export class CartSummaryComponent extends BaseComponent<CartSummaryComponentProps> {
    constructor(controller: CartSummaryController, cart: Cart) {
        super('cart-page__summary', { controller, cart });
    }

    protected render(): void {
        const title = document.createElement('div');
        title.classList.add('summery__title');
        title.innerText = 'Summary';

        this.element.append(title);
    }
}
