import { Cart } from '../../model/Cart';
import { CartCatalogComponent } from '../../view/components/cart-catalog/CartCatalogComponent';
import { Router } from '../../view/Router';
import { BaseController } from '../BaseController';

export class CartCatalogController extends BaseController<CartCatalogComponent> {
    public component: CartCatalogComponent;

    constructor(cart: Cart, router: Router) {
        super();
        this.component = new CartCatalogComponent(this, cart, router);
    }

    public remove(): void {
        this.component.beforeRemove();
    }
}
