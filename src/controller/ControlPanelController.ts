import { OnlineStore } from "../model/OnlineStore";
import { ControlPanelComponent } from "../view/components/control-panel/ControlPanelComponent";
import { BaseController } from "./BaseController";

export class ControlPanelController extends BaseController<ControlPanelComponent> {
    public component: ControlPanelComponent;

    constructor(onlineStore: OnlineStore) {
        super();
        this.component = new ControlPanelComponent(this, onlineStore.getSorter());
    }

    // TODO Move to view
    public changeProductCardsSize(size: string): void {
        const cards = document.querySelectorAll(".product-card");
        cards.forEach((product: Element): void => {
            if (product.classList.contains(size)) return;
            product.classList.remove("small", "big");
            product.classList.add(size);
        });
    }
}
