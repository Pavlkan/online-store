import { OnlineStore } from "../model/OnlineStore";
import { ControlPanelComponent } from "../view/components/control-panel/ControlPanelComponent";
import { BaseController } from "./BaseController";

export class ControlPanelController extends BaseController<ControlPanelComponent> {
    public component: ControlPanelComponent;

    constructor(onlineStore: OnlineStore) {
        super();
        this.component = new ControlPanelComponent(this, onlineStore.getSorter());
    }
}
