import { HeaderController } from "../../controller/HeaderController";
import { BaseComponent } from "../BaseComponent";

interface HeaderComponentProps {
    controller: HeaderController;
}

export class HeaderComponent extends BaseComponent<HeaderComponentProps> {
    private logo!: HTMLElement;
    private amountContainer!: HTMLElement;

    constructor(controller: HeaderController) {
        super("header", { controller }, "header");
    }

    protected render() {
        this.logo = document.createElement("h1");
        this.logo.classList.add("header__logo");
        this.logo.innerText = "🛍 Online Store";

        this.amountContainer = document.createElement("div");
        this.amountContainer.classList.add("header__amount-container");

        this.element.append(this.logo, this.amountContainer);
    }
}
