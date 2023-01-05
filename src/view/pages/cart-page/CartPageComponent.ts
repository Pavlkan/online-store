import { CartPageController } from '../../../controller/pages/CartPageController';
import { BaseComponent } from '../../BaseComponent';
import { CartCatalogComponent } from '../../components/cart-catalog/CartCatalogComponent';

interface CartPageComponentProps {
    controller: CartPageController;
    cartCatalogComponent: CartCatalogComponent;
}

export class CartPageComponent extends BaseComponent<CartPageComponentProps> {
    constructor(controller: CartPageController, cartCatalogComponent: CartCatalogComponent) {
        super('cart-page', { controller, cartCatalogComponent }, 'main');
    }

    protected render(): void {
        this.element.append(this.props.cartCatalogComponent.element);
    }
}
