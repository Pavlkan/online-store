import { Cart } from '../../model/Cart';
import { CartCatalogComponent } from '../../view/components/cart-catalog/CartCatalogComponent';
import { BaseController } from '../BaseController';

export class CartCatalogController extends BaseController<CartCatalogComponent> {
    public component: CartCatalogComponent;

    constructor(cart: Cart) {
        super();
        this.component = new CartCatalogComponent(this, cart);
    }

    public remove(): void {
        this.component.beforeRemove();
    }
}
