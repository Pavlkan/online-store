import { CounterOfFindsController } from "../../../../controller/CounterOfFindsController";
import { CounterOfFinds } from "../../../../model/CounterOfFinds";
import { BaseComponent } from "../../../BaseComponent";

interface CounterOfFindsComponentProps {
    controller: CounterOfFindsController;
    counterOfFinds: CounterOfFinds;
}

export class CounterOfFindsComponent extends BaseComponent<CounterOfFindsComponentProps> {
    private counterSubscriptionId!: number;

    constructor(controller: CounterOfFindsController, counterOfFinds: CounterOfFinds) {
        super("control-panel__counter", { controller, counterOfFinds });
    }

    public beforeRemove(): void {
        this.props.counterOfFinds.unsubscribe(this.counterSubscriptionId);
    }

    protected render() {
        this.counterSubscriptionId = this.props.counterOfFinds.subscribe((counter) => {
            this.element.innerText = `Found: ${counter}`;
        });
    }
}
