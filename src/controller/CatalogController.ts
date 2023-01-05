import { Cart } from '../model/Cart';
import { OnlineStore } from '../model/OnlineStore';
import { Product } from '../model/Product';
import { CatalogComponent } from '../view/components/catalog/CatalogComponent';
import { Router } from '../view/Router';
import { BaseController } from './BaseController';

export class CatalogController extends BaseController<CatalogComponent> {
    public component: CatalogComponent;
    private cart: Cart;

    constructor(onlineStore: OnlineStore, router: Router) {
        super();
        this.cart = onlineStore.getCart();
        this.component = new CatalogComponent(this, onlineStore.getSelection(), router, this.cart);
    }

    public remove(): void {
        this.component.beforeRemove();
    }

    public toggleProduct(product: Product): void {
        if (this.cart.getData().has(product)) {
            this.cart.removeFromCart(product);
        } else {
            this.cart.addToCart(product);
        }
    }
}
