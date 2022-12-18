import { OnlineStore } from "../model/OnlineStore";
import { CatalogComponent } from "../view/components/catalog/CatalogComponent";
import { BaseController } from "./BaseController";

export class CatalogController extends BaseController<CatalogComponent> {
    public component: CatalogComponent;

    constructor(onlineStore: OnlineStore) {
        super();
        this.component = new CatalogComponent(this, onlineStore.getCategories());
    }
}
