import { ControlPanelController } from "../../../controller/ControlPanelController";
import { BaseComponent } from "../../BaseComponent";
import "./control-panel.css";

interface ControlPanelComponentProps {
    controller: ControlPanelController;
}

export class ControlPanelComponent extends BaseComponent<ControlPanelComponentProps> {
    private sortOptions!: HTMLElement;
    private sizeOptions!: HTMLElement;

    constructor(controller: ControlPanelController) {
        super("control-panel", { controller });
    }

    render() {
        this.sortOptions = document.createElement("select");
        this.sortOptions.classList.add("control-panel__select-options");
        this.sortOptions.insertAdjacentHTML(
            "afterbegin",
            `
            <option id="optionDefault" selected disabled>Sort options:</option>
            <option id="option1">Sort by price ASC</option>
            <option id="option2">Sort by price DESC</option>
            <option id="option3">Sort by rating ASC</option>
            <option id="option4">Sort by rating DESC</option>
            <option id="option5">Sort by discount ASC</option>
            <option id="option6">Sort by discount DESC</option>
        `
        );

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
                this.props.controller.changeProductCardsSize(event.target.id);
            }
        });
    }
}
