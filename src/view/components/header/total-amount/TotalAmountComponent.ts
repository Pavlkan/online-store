import { Cart } from '../../../../model/Cart';
import { BaseComponent } from '../../../BaseComponent';
import './total-amount.css';

interface TotalAmountComponentProps {
    cart: Cart;
}

export class TotalAmountComponent extends BaseComponent<TotalAmountComponentProps> {
    private cartSubscriptionId!: number;

    constructor(cart: Cart) {
        super('header__amount-container', { cart });
    }

    public beforeRemove(): void {
        this.props.cart.unsubscribe(this.cartSubscriptionId);
    }

    protected render() {
        const title = document.createElement('div');
        title.classList.add('header__amount-title');
        title.innerText = 'Cart total:';

        const amount = document.createElement('div');
        amount.classList.add('header__amount-amount');

        this.element.append(title, amount);

        this.cartSubscriptionId = this.props.cart.subscribe(() => {
            amount.innerText = `€${this.props.cart.getAmount()}`;
        });
    }
}
