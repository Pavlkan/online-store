import { CartPageController } from '../../../controller/pages/CartPageController';
import { Cart, CartData } from '../../../model/Cart';
import { BaseComponent } from '../../BaseComponent';
import { CartCatalogComponent } from '../../components/cart-catalog/CartCatalogComponent';
import { CartSummaryComponent } from '../../components/cart-summary/CartSummaryComponent';
import './cart-page.css';

interface CartPageComponentProps {
    controller: CartPageController;
    cartCatalogComponent: CartCatalogComponent;
    cartSummaryComponent: CartSummaryComponent;
    cart: Cart;
}

export class CartPageComponent extends BaseComponent<CartPageComponentProps> {
    private cartSubscriptionId!: number;

    constructor(
        controller: CartPageController,
        cartCatalogComponent: CartCatalogComponent,
        cartSummaryComponent: CartSummaryComponent,
        cart: Cart
    ) {
        super('cart-page', { controller, cartCatalogComponent, cartSummaryComponent, cart }, 'main');
    }

    public beforeRemove(): void {
        this.props.cart.unsubscribe(this.cartSubscriptionId);
    }

    protected render(): void {
        this.cartSubscriptionId = this.props.cart.subscribe((cart: CartData) => {
            this.element.innerHTML = '';

            if (cart.size) {
                this.element.append(this.props.cartCatalogComponent.element, this.props.cartSummaryComponent.element);
            } else {
                const emptyCartMessage = document.createElement('h3');
                emptyCartMessage.innerText = 'Cart is Empty';
                this.element.append(emptyCartMessage);
            }
        });
    }
}
