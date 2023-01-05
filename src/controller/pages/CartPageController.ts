import { OnlineStore } from '../../model/OnlineStore';
import { CartPageComponent } from '../../view/pages/cart-page/CartPageComponent';
import { Router } from '../../view/Router';
import { BaseController } from '../BaseController';
import { CartCatalogController } from '../cart/CartCatalogController';

export class CartPageController extends BaseController<CartPageComponent> {
    public component: CartPageComponent;
    private cartCatalogController: CartCatalogController;

    constructor(onlineStore: OnlineStore, router: Router) {
        super();
        this.cartCatalogController = new CartCatalogController(onlineStore.getCart());
        this.component = new CartPageComponent(this, this.cartCatalogController.component);
    }

    public remove(): void {
        this.component.beforeRemove();
    }
}
