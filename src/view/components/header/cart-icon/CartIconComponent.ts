import { Cart } from '../../../../model/Cart';
import { BaseComponent } from '../../../BaseComponent';
import { Router } from '../../../Router';
import './cart-icon.css';

interface CartIconComponentProps {
    cart: Cart;
    router: Router;
}

export class CartIconComponent extends BaseComponent<CartIconComponentProps> {
    private cartSubscriptionId!: number;

    constructor(cart: Cart, router: Router) {
        super('header__cart-icon', { cart, router });
    }

    public beforeRemove(): void {
        this.props.cart.unsubscribe(this.cartSubscriptionId);
    }

    protected render() {
        const cartCount = document.createElement('div');
        cartCount.classList.add('header__cart-count');

        const cartLogo = document.createElement('img');
        cartLogo.className = 'header__cart';

        this.element.append(cartLogo, cartCount);

        this.cartSubscriptionId = this.props.cart.subscribe(() => {
            cartCount.innerText = this.props.cart.getProductsQuantity().toString();
        });
    }

    protected addListeners(): void {
        this.element.addEventListener('click', () => {
            this.props.router.navigateTo('cart');
        });
    }
}
