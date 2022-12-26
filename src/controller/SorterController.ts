import { Sorter } from "../model/Sorter";
import { SorterComponent as SorterComponent } from "../view/components/control-panel/sorter/SorterComponent";
import { BaseController } from "./BaseController";

export class SorterController extends BaseController<SorterComponent> {
    public component: SorterComponent;

    constructor(sorter: Sorter) {
        super();
        this.component = new SorterComponent(this, sorter);
    }
}
