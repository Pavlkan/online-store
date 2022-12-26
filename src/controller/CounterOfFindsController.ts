import { CounterOfFindsComponent } from "../view/components/control-panel/counter-of-finds/CounterOfFindsComponent";
import { BaseController } from "./BaseController";

export class CounterOfFindsController extends BaseController<CounterOfFindsComponent> {
    public component: CounterOfFindsComponent;

    constructor() {
        super();
        this.component = new CounterOfFindsComponent(this);
    }
}
