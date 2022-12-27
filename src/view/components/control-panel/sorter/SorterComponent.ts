import { SorterController } from "../../../../controller/SorterController";
import { Sorter } from "../../../../model/Sorter";
import { BaseComponent } from "../../../BaseComponent";

interface SorterComponentProps {
    controller: SorterController;
    sorter: Sorter;
}

export class SorterComponent extends BaseComponent<SorterComponentProps> {
    private sorterSubscriptionId!: number;

    constructor(controller: SorterController, sorter: Sorter) {
        super("control-panel__select-options", { controller, sorter }, "select");
    }

    public beforeRemove(): void {
        this.props.sorter.unsubscribe(this.sorterSubscriptionId);
    }

    protected render() {
        this.props.sorter.getOptions().forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.innerText = option;
            optionElement.value = option;
            optionElement.classList.add("option-element");
            this.element.append(optionElement);
        });

        this.subscribeOnSortOption();
    }

    protected addListeners(): void {
        this.element.addEventListener("change", () => {
            this.props.controller.sort((this.element as HTMLSelectElement).value);
        });
    }

    private subscribeOnSortOption(): void {
        this.sorterSubscriptionId = this.props.sorter.subscribe((sortOption: string) => {
            const options = this.element.children;
            for (let i = 0; i < options.length; i++) {
                const selected = (options[i] as HTMLOptionElement).value === sortOption;
                (options[i] as HTMLOptionElement).selected = selected;
            }
        });
    }
}
