import { CartPageController } from '../../../controller/pages/CartPageController';
import { BaseComponent } from '../../BaseComponent';
import { CartCatalogComponent } from '../../components/cart-catalog/CartCatalogComponent';
import { CartSummaryComponent } from '../../components/cart-summary/CartSummaryComponent';
import './cart-page.css';

interface CartPageComponentProps {
    controller: CartPageController;
    cartCatalogComponent: CartCatalogComponent;
    cartSummaryComponent: CartSummaryComponent;
}

export class CartPageComponent extends BaseComponent<CartPageComponentProps> {
    constructor(
        controller: CartPageController,
        cartCatalogComponent: CartCatalogComponent,
        cartSummaryComponent: CartSummaryComponent
    ) {
        super('cart-page', { controller, cartCatalogComponent, cartSummaryComponent }, 'main');
    }

    protected render(): void {
        this.element.append(this.props.cartCatalogComponent.element, this.props.cartSummaryComponent.element);
    }
}
