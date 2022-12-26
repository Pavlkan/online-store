import { SorterController } from "../../../../controller/SorterController";
import { Sorter } from "../../../../model/Sorter";
import { BaseComponent } from "../../../BaseComponent";

interface SorterComponentProps {
    controller: SorterController;
    sorter: Sorter;
}

export class SorterComponent extends BaseComponent<SorterComponentProps> {
    constructor(controller: SorterController, sorter: Sorter) {
        super("control-panel__select-options", { controller, sorter }, "select");
    }

    render() {
        this.props.sorter.getOptions().forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.innerText = option;
            optionElement.value = option;
            optionElement.classList.add("option-element");
            this.element.append(optionElement);
        });

        // TODO realize subscription
        this.props.sorter.subscribe(() => {
            this.element.children;
        });
    }
}
