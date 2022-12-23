import { OnlineStore } from "../../model/OnlineStore";
import { Product } from "../../model/Product";
import { ProductPageComponent } from "../../view/pages/product-page/ProductPageComponent";
import { Router } from "../../view/Router";
import { BaseController } from "../BaseController";

export class ProductPageController extends BaseController<ProductPageComponent> {
  public component: ProductPageComponent;
  private onlineStore: OnlineStore;
  private router: Router;

  constructor(onlineStore: OnlineStore, router: Router) {
    super();
    this.onlineStore = onlineStore;
    this.router = router;
    this.component = new ProductPageComponent(this, this.getProduct(), router);
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
