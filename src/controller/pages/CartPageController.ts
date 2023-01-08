import { OnlineStore } from '../../model/OnlineStore';
import { CartPageComponent } from '../../view/pages/cart-page/CartPageComponent';
import { Router } from '../../view/Router';
import { BaseController } from '../BaseController';
import { CartCatalogController } from '../cart/CartCatalogController';
import { CartSummaryController } from '../cart/CartSummaryController';

export class CartPageController extends BaseController<CartPageComponent> {
    public component: CartPageComponent;
    private cartCatalogController: CartCatalogController;
    private cartSummaryController: CartSummaryController;

    constructor(onlineStore: OnlineStore, router: Router) {
        super();
        this.cartCatalogController = new CartCatalogController(onlineStore.getCart(), router);
        this.cartSummaryController = new CartSummaryController(onlineStore.getCart(), router);
        this.component = new CartPageComponent(
            this,
            this.cartCatalogController.component,
            this.cartSummaryController.component
        );
    }

    public remove(): void {
        this.cartCatalogController.remove();
        this.cartSummaryController.remove();
        this.component.beforeRemove();
    }
}
