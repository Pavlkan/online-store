import { Cart } from '../../model/Cart';
import { OnlineStore } from '../../model/OnlineStore';
import { Product } from '../../model/Product';
import { ProductPageComponent } from '../../view/pages/product-page/ProductPageComponent';
import { Router } from '../../view/Router';
import { BaseController } from '../BaseController';

export class ProductPageController extends BaseController<ProductPageComponent> {
  public component: ProductPageComponent;
  private onlineStore: OnlineStore;
  private router: Router;
  private cart: Cart;

  constructor(onlineStore: OnlineStore, router: Router) {
    super();
    this.onlineStore = onlineStore;
    this.router = router;
    this.cart = onlineStore.getCart()
    this.component = new ProductPageComponent(this, this.getProduct(), router, this.cart);
  }

  public toggleProduct(product: Product): void {
    if (this.cart.getData().has(product)) {
        this.cart.removeFromCart(product);
    } else {
        this.cart.addToCart(product);
    }
}

  private getProduct(): Product {
    const productId = this.getProductId();
    const product = this.onlineStore.getProductById(productId);
    if (!product) {
      throw new Error(`Product ${productId}not found`);
    }
    return product;
  }

  private getProductId(): number {
    return Number(this.router.getSegments()[1]);
  }
}
