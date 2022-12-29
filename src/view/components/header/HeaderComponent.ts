import { throws } from "assert";
import { HeaderController } from "../../../controller/HeaderController";
import { BaseComponent } from "../../BaseComponent";
import "./header.css";

interface HeaderComponentProps {
    controller: HeaderController;
}

export class HeaderComponent extends BaseComponent<HeaderComponentProps> {
    private logo!: HTMLDivElement;
    private title!: HTMLHeadingElement;
    private icon!: HTMLDivElement;

    private amountContainer!: HTMLElement;
    public cart!: HTMLImageElement;

    constructor(controller: HeaderController) {
        super("header", { controller }, "header");
    }

    protected render() {
        this.logo = document.createElement("div");
        this.logo.classList.add("header__logo");

        this.title = document.createElement("h1");
        this.title.className = "header__title";
        this.title.innerText = "Online Store";

        this.icon = document.createElement("div");
        this.icon.classList.add("header__icon");
        this.icon.innerText = "🛍";

        this.logo.append(this.icon, this.title);

        this.amountContainer = document.createElement("div");
        this.amountContainer.classList.add("header__amount-container");
        this.amountContainer.innerText = "Cart total: ";

        this.cart = document.createElement("img");
        this.cart.className = "header__cart";

        this.element.append(this.logo, this.amountContainer, this.cart);
    }
}
