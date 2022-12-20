import { OnlineStore } from "../../model/OnlineStore";
import { CatalogPageComponent } from "../../view/pages/catalog-page/CatalogPageComponent";
import { Router } from "../../view/Router";
import { BaseController } from "../BaseController";
import { CatalogController } from "../CatalogController";

export class CatalogPageController extends BaseController<CatalogPageComponent> {
    public component: CatalogPageComponent;
    public onlineStore: OnlineStore;
    public router: Router;
    public catalog: CatalogController;

    constructor(onlineStore: OnlineStore, router: Router) {
        super();
        this.onlineStore = onlineStore;
        this.router = router;
        this.catalog = new CatalogController(onlineStore, this.router);
        this.component = new CatalogPageComponent(this, this.catalog.component);
    }
}
