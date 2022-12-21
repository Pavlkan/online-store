import { ControlPanelComponent } from "../view/components/control-panel/ControlPanelComponent";
import { BaseController } from "./BaseController";
import { CatalogPageController } from "./pages/CatalogPageController";

export class ControlPanelController extends BaseController<ControlPanelComponent> {
    public component: ControlPanelComponent;
    public controller: CatalogPageController;

    constructor(controller: CatalogPageController) {
        super();
        this.controller = controller;
        this.component = new ControlPanelComponent(this);
    }

    public changeProductCardsSize(size: string): void {
        this.controller.changeProductCardsSize(size);
    }
}
