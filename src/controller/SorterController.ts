import { Sorter } from "../model/Sorter";
import { SorterComponent as SorterComponent } from "../view/components/control-panel/sorter/SorterComponent";
import { BaseController } from "./BaseController";

export class SorterController extends BaseController<SorterComponent> {
    public component: SorterComponent;

    private sorter: Sorter;

    constructor(sorter: Sorter) {
        super();
        this.sorter = sorter;
        this.component = new SorterComponent(this, sorter);
    }

    public remove(): void {
        this.component.beforeRemove();
    }

    public sort(data: string) {
        this.sorter.notify(data);
    }
}
