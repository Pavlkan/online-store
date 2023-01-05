import { CartController } from "../../../controller/CartController";
import { Product } from "../../../model/Product";
import { BaseComponent } from "../../BaseComponent";
import { Router } from "../../Router";
import "./cart-component.css";

interface CartComponentProps {
    controller: CartController;
    product: Product;
    router: Router;
}

export class CartComponent extends BaseComponent<CartComponentProps> {
    private itemInfo!: HTMLDivElement;

    constructor(controller: CartController, product: Product, router: Router) {
        super("cart-item", { controller, product, router }, "div");
    }

    render(): void {
        const cartComponentContainer = document.createElement("div");
        cartComponentContainer.className = "cart-component-container";

        const productItem = document.createElement("div");
        productItem.className = "product-in-cart__item";

        const itemNum = document.createElement("div");
        itemNum.className = "item__num";
        itemNum.innerText = `${1}`; //TODO add logic of increment number

        this.itemInfo = document.createElement("div");
        this.itemInfo.className = "item__info";

        const itemThumbnailWrapper = document.createElement("div");
        itemThumbnailWrapper.className = "item__thumbnail-wrapper";
        const itemThumbnail = document.createElement("img");
        itemThumbnail.className = "item__thumbnail";
        itemThumbnail.src = `${this.props.product.thumbnail}`;
        itemThumbnail.alt = "Image of product";
        itemThumbnailWrapper.append(itemThumbnail);

        const productDetails = document.createElement("div");
        productDetails.className = "item-details";
        productDetails.insertAdjacentHTML("beforeend", `
      <h3 class="item-details__title">${this.props.product.title}</h3>
      <p class="item-details__description">${this.props.product.description}</p>
      <div class="item-details__other">
        <p class="item-details__rating">${this.props.product.rating}</p>
        <p class="item-details__discount">${this.props.product.discountPercentage}</p>
      </div>`
        );

        this.itemInfo.append(itemThumbnailWrapper, productDetails);
        productItem.append(itemNum, this.itemInfo);

        cartComponentContainer.append(productItem);
    }
}
