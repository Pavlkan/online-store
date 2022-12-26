import { CounterOfFindsController } from "../../../../controller/CounterOfFindsController";
import { BaseComponent } from "../../../BaseComponent";

interface CounterOfFindsComponentProps {
    controller: CounterOfFindsController;
}

export class CounterOfFindsComponent extends BaseComponent<CounterOfFindsComponentProps> {
    constructor(controller: CounterOfFindsController) {
        super("control-panel__counter", { controller });
    }

    render() {
        this.element.innerText = `Found: `;
    }
}
