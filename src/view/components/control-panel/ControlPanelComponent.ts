import { ControlPanelController } from "../../../controller/ControlPanelController";
import { Sorter } from "../../../model/Sorter";
import { BaseComponent } from "../../BaseComponent";
import "./control-panel.css";

interface ControlPanelComponentProps {
    controller: ControlPanelController;
    sorter: Sorter;
}

// TODO Split into four components with controllers, folders in current folder
export class ControlPanelComponent extends BaseComponent<ControlPanelComponentProps> {
    private sortOptions!: HTMLElement;
    private sizeOptions!: HTMLElement;

    constructor(controller: ControlPanelController, sorter: Sorter) {
        super("control-panel", { controller, sorter });
    }

    render() {
        this.sortOptions = document.createElement("select");
        this.sortOptions.classList.add("control-panel__select-options");
        this.props.sorter.getOptions().forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.innerText = option;
            optionElement.value = option;
            optionElement.classList.add("option-element");
            this.sortOptions.append(optionElement);
        });

        this.props.sorter.subscribe((optionValue: string) => {
            this.sortOptions.children;
        });

        this.sizeOptions = document.createElement("div");
        this.sizeOptions.classList.add("control-panel__size-options");
        const smallSize = document.createElement("button");
        const bigSize = document.createElement("button");
        smallSize.innerText = "small";
        bigSize.innerText = "big";
        smallSize.id = "small";
        bigSize.id = "big";
        this.sizeOptions.append(smallSize, bigSize);

        this.element.append(this.sortOptions, this.sizeOptions);
    }

    protected addListeners(): void {
        this.sizeOptions.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.target.id) {
                this.changeProductCardsSize(event.target.id);
            }
        });
    }

    private changeProductCardsSize(size: string): void {
        const cards = document.querySelectorAll(".product-card");
        cards.forEach((product: Element): void => {
            if (product.classList.contains(size)) return;
            product.classList.remove("small", "big");
            product.classList.add(size);
        });
    }
}
