import { OnlineStore } from "../model/OnlineStore";
import { ControlPanelComponent } from "../view/components/control-panel/ControlPanelComponent";
import { BaseController } from "./BaseController";
import { CounterOfFindsController } from "./CounterOfFindsController";
import { SearcherController } from "./SearcherController";
import { SizerController } from "./SizerController";
import { SorterController } from "./SorterController";

export class ControlPanelController extends BaseController<ControlPanelComponent> {
    public component: ControlPanelComponent;
    public sorterController: SorterController;
    public counterOfFindsController: CounterOfFindsController;
    public sizerController: SizerController;
    public searcherController: SearcherController;

    constructor(onlineStore: OnlineStore) {
        super();
        this.sorterController = new SorterController(onlineStore.getSorter());
        this.counterOfFindsController = new CounterOfFindsController();
        this.searcherController = new SearcherController();
        this.sizerController = new SizerController();
        this.component = new ControlPanelComponent(
            this,
            onlineStore.getSorter(),
            this.sorterController.component.element,
            this.counterOfFindsController.component.element,
            this.searcherController.component.element,
            this.sizerController.component.element
        );
    }

    public remove(): void {
        this.sorterController.remove();
        this.counterOfFindsController.remove();
        this.searcherController.remove();
        this.sizerController.remove();
    }
}
