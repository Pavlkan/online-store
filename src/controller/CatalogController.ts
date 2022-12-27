import { OnlineStore } from "../model/OnlineStore";
import { CatalogComponent } from "../view/components/catalog/CatalogComponent";
import { Router } from "../view/Router";
import { BaseController } from "./BaseController";

export class CatalogController extends BaseController<CatalogComponent> {
    public component: CatalogComponent;

    constructor(onlineStore: OnlineStore, router: Router) {
        super();
        this.component = new CatalogComponent(this, onlineStore.getSelection(), router);
    }
}
