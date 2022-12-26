import { ControlPanelController } from "../../../controller/ControlPanelController";
import { Sorter } from "../../../model/Sorter";
import { BaseComponent } from "../../BaseComponent";
import "./control-panel.css";

interface ControlPanelComponentProps {
    controller: ControlPanelController;
    sorter: Sorter;
    sorterElement: HTMLElement;
    counterOfFindsController: HTMLElement;
    searcherElement: HTMLElement;
    sizerElement: HTMLElement;
}

export class ControlPanelComponent extends BaseComponent<ControlPanelComponentProps> {
    constructor(
        controller: ControlPanelController,
        sorter: Sorter,
        sorterElement: HTMLElement,
        counterOfFindsController: HTMLElement,
        searcherElement: HTMLElement,
        sizerElement: HTMLElement
    ) {
        super("control-panel", {
            controller,
            sorter,
            sorterElement,
            counterOfFindsController,
            searcherElement,
            sizerElement,
        });
    }

    render() {
        const { sorterElement, counterOfFindsController, searcherElement, sizerElement } = this.props;

        this.element.append(sorterElement, counterOfFindsController, searcherElement, sizerElement);
    }
}
