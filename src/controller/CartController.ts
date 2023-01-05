import { OnlineStore } from "../model/OnlineStore";
import { CartComponent } from "../view/components/cart/CartComponent";
import { Router } from "../view/Router";
import { BaseController } from "./BaseController";

export class CartController extends BaseController<CartComponent> {
    public component: CartComponent;

    constructor(onlineStore: OnlineStore, router: Router) {
        super();
        this.component = new CartComponent(this, this, router);
    }
}
