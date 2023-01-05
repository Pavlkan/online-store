import { OnlineStore } from "../../model/OnlineStore";
import { CartPageComponent } from "../../view/pages/cart-page/CartPageComponent";
import { Router } from "../../view/Router";
import { BaseController } from "../BaseController";
import { CartController } from "../CartController";

export class CartPageController extends BaseController<CartPageComponent> {
    public component: CartPageComponent;
    public onlineStore: OnlineStore;
    public router: Router;
    public cart: CartController;

    constructor(onlineStore: OnlineStore, router: Router) {
        super();
        this.onlineStore = onlineStore;
        this.router = router;
        this.cart = new CartController(onlineStore, this.router);
        this.component = new CartPageComponent(this, this.cart.component);
    }
}
