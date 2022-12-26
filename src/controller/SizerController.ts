import { SizerComponent } from "../view/components/control-panel/sizer/SizingComponent";
import { BaseController } from "./BaseController";

export class SizerController extends BaseController<SizerComponent> {
    public component: SizerComponent;

    constructor() {
        super();
        this.component = new SizerComponent(this);
    }
}
