import { OnlineStore } from "../model/OnlineStore";
import { CatalogComponent } from "../view/components/catalog/CatalogComponent";
import { BaseController } from "./BaseController";
// import { ProductCardController } from "./ProductCardController";

export class CatalogController extends BaseController<CatalogComponent> {
    public component: CatalogComponent;
    // public productCardController: ProductCardController;

    constructor(onlineStore: OnlineStore) {
        super();
        // this.productCardController = new ProductCardController();
        this.component = new CatalogComponent(this, onlineStore.getCategories());
    }
}
