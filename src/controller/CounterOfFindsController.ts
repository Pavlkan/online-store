import { CounterOfFinds } from "../model/CounterOfFinds";
import { CounterOfFindsComponent } from "../view/components/control-panel/counter-of-finds/CounterOfFindsComponent";
import { BaseController } from "./BaseController";

export class CounterOfFindsController extends BaseController<CounterOfFindsComponent> {
    public component: CounterOfFindsComponent;
    private counterOfFinds!: CounterOfFinds;

    constructor(counterOfFinds: CounterOfFinds) {
        super();
        this.component = new CounterOfFindsComponent(this, counterOfFinds);
    }
}
