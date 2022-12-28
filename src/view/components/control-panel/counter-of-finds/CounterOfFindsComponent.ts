import { CounterOfFindsController } from "../../../../controller/CounterOfFindsController";
import { CounterOfFinds } from "../../../../model/CounterOfFinds";
import { BaseComponent } from "../../../BaseComponent";

interface CounterOfFindsComponentProps {
    controller: CounterOfFindsController;
    counterOfFinds: CounterOfFinds;
}

export class CounterOfFindsComponent extends BaseComponent<CounterOfFindsComponentProps> {
    constructor(controller: CounterOfFindsController, counterOfFinds: CounterOfFinds) {
        super("control-panel__counter", { controller, counterOfFinds });
    }

    protected render() {
        this.props.counterOfFinds.subscribe((counter) => {
            this.element.innerText = `Found: ${counter}`;
        });
    }
}
