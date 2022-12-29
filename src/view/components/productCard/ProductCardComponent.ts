import { Product } from "../../../model/Product";
import { BaseComponent } from "../../BaseComponent";
import { Router } from "../../Router";
import "./product-card.css";

interface ProductCardComponentProps {
    product: Product;
    router: Router;
}

export class ProductCardComponent extends BaseComponent<ProductCardComponentProps> {
    private choiceButton!: HTMLElement;
    private detailsButton!: HTMLElement;

    constructor(product: Product, router: Router) {
        super("product-card", { product, router });
    }

    protected render() {
        const title = document.createElement("h4");
        title.classList.add("product-card__title");
        title.innerText = this.props.product.title;

        const content = document.createElement("div");
        content.classList.add("product-title__content");

        const description = document.createElement("div");
        description.classList.add("product-card__description");
        description.insertAdjacentHTML(
            "afterbegin",
            `
                <p class="description__item">Category: ${this.props.product.category}</p>
                <p class="description__item">Brand: ${this.props.product.brand}</p>
                <p class="description__item">Price: ${this.props.product.price}</p>
                <p class="description__item">Discount: ${this.props.product.discountPercentage}</p>
                <p class="description__item">Rating: ${this.props.product.rating}</p>
                <p class="description__item">Stock: ${this.props.product.stock}</p>
            `
        );

        const controls = document.createElement("div");
        controls.classList.add("product-card__controls");

        this.choiceButton = document.createElement("button");
        this.choiceButton.classList.add("product-card__choice-button");
        this.choiceButton.innerText = "Add to card";

        this.detailsButton = document.createElement("button");
        this.detailsButton.classList.add("product-card__details-button");
        this.detailsButton.innerText = "Details";

        controls.append(this.choiceButton, this.detailsButton);
        content.append(description, controls);
        this.element.append(title, content);
        this.element.style.background = `url('${this.props.product.thumbnail}') 0% 0% / cover`;
    }

    addListeners() {
        this.element.addEventListener("click", (event): void => {
            if (event.target instanceof HTMLElement) {
                if (event.target === this.choiceButton) {
                    console.log("btnclc");
                    return;
                }
                console.log("click");
                this.props.router.navigateTo(`product/${this.props.product.id}`);
            }
        });
    }
}
