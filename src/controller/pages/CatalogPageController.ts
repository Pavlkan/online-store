import { OnlineStore } from "../../model/OnlineStore";
import { CatalogPageComponent } from "../../view/pages/catalog-page/CatalogPageComponent";
import { Router } from "../../view/Router";
import { BaseController } from "../BaseController";
import { CatalogController } from "../CatalogController";
import { ControlPanelController } from "../ControlPanelController";

export class CatalogPageController extends BaseController<CatalogPageComponent> {
    public component: CatalogPageComponent;
    public onlineStore: OnlineStore;
    public router: Router;
    public catalog: CatalogController;
    public controlPanel: ControlPanelController;

    constructor(onlineStore: OnlineStore, router: Router) {
        super();
        this.onlineStore = onlineStore;
        this.router = router;
        this.controlPanel = new ControlPanelController(this.onlineStore);
        this.catalog = new CatalogController(onlineStore, this.router);
        this.component = new CatalogPageComponent(this, this.controlPanel.component, this.catalog.component);
    }

    public remove(): void {
        this.controlPanel.remove();
    }
}
