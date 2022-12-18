import { OnlineStore } from "../../model/OnlineStore";
import { CatalogPageComponent } from "../../view/pages/catalog-page/CatalogPageComponent";
import { BaseController } from "../BaseController";
import { CatalogController } from "../CatalogController";

export class CatalogPageController extends BaseController<CatalogPageComponent> {
    public component: CatalogPageComponent;
    public onlineStore: OnlineStore;
    public catalog: CatalogController;

    constructor(onlineStore: OnlineStore) {
        super();
        this.onlineStore = onlineStore;
        this.catalog = new CatalogController(onlineStore);
        this.component = new CatalogPageComponent(this, this.catalog.component);
    }
}
