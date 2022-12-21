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
        this.controlPanel = new ControlPanelController(this);
        this.catalog = new CatalogController(onlineStore, this.router);
        this.component = new CatalogPageComponent(this, this.controlPanel.component, this.catalog.component);
    }

    public changeProductCardsSize(size: string): void {
        const cards = document.querySelectorAll(".product-card");
        cards.forEach((product: Element): void => {
            if (product.classList.contains(size)) return;
            product.classList.remove("small", "big");
            product.classList.add(size);
        });
    }
}
