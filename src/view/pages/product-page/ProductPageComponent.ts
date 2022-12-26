import { ProductPageController } from "../../../controller/pages/ProductPageController";
import { Product } from "../../../model/Product";
import { BaseComponent } from "../../BaseComponent";
import { Router } from '../../Router';
import './product-page-component.css';

interface ProductPageComponentProps {
  controller: ProductPageController;
  product: Product;
  router: Router;
}

export class ProductPageComponent extends BaseComponent<ProductPageComponentProps> {
  private productPageContainer!: HTMLDivElement;
  private choiceButton!: HTMLButtonElement;
  private buyButton!: HTMLButtonElement;
  private productImages!: HTMLImageElement[];
  private productCardThumbnail!: HTMLImageElement;
  private navItemClickable!: HTMLParagraphElement;

  constructor(controller: ProductPageController, product: Product, router: Router) {
    super("product-description-page", { controller, product, router });
  }

  render(): void {
    this.productPageContainer = document.createElement('div');
    this.productPageContainer.className = "product-description-page-container outer-container";

    const navContainer = document.createElement('div');
    navContainer.className = "nav-container";

    this.navItemClickable = document.createElement('p');
    this.navItemClickable.className = "nav-container__item_clickable";
    this.navItemClickable.innerText = 'STORE';
    navContainer.append(this.navItemClickable);

    navContainer.insertAdjacentHTML("beforeend", `
          <span> >> </span>
          <p class="nav-container__item">${this.props.product.category}</p>
          <span> >> </span>
          <p class="nav-container__item">${this.props.product.brand}</p>
          <span> >> </span>
          <p class="nav-container__item">${this.props.product.title}</p>
        `
    );
    const productCardContainer = document.createElement('div');
    productCardContainer.className = "product-card-container inner-container";

    const title = document.createElement("h4");
    title.className = "product-card__title_product-page title";
    title.innerText = this.props.product.title;

    const productCardData = document.createElement('div');
    productCardData.className = "product-card__data";

    const productCardImagesContainer = document.createElement('div');
    productCardImagesContainer.className = "product-card__images-container";

    this.productImages = this.props.product.images.map(source => {
      const image = document.createElement('img');
      image.className = "product-card__image";
      image.src = source;
      image.alt = 'Image of product';

      return image;
    });

    productCardImagesContainer.append(...this.productImages);

    const productCardThumbnailContainer = document.createElement('div');
    productCardThumbnailContainer.className = "product-card-thumbnail-container";
    this.productCardThumbnail = document.createElement('img');
    this.productCardThumbnail.className = "product-card__thumbnail_product-page";
    this.productCardThumbnail.src = `${this.props.product.thumbnail}`;
    this.productCardThumbnail.alt = 'Image of product';
    productCardThumbnailContainer.append(this.productCardThumbnail);

    const productCardList = document.createElement('div');
    productCardList.className = "product-card__list_product-page";

    productCardList.insertAdjacentHTML('beforeend', `
        <div class="product-title__content">
          <p class="description__item_product-page">Description: ${this.props.product.description}</p>
          <p class="description__item_product-page">Discount: ${this.props.product.discountPercentage}</p>
          <p class="description__item_product-page">Rating: ${this.props.product.rating}</p>
          <p class="description__item_product-page">Stock: ${this.props.product.stock}</p>
          <p class="description__item_product-page">Brand: ${this.props.product.brand}</p>
          <p class="description__item_product-page">Category: ${this.props.product.category}</p>
        </div>`
    );

    const controls = document.createElement("div");
    controls.className = "product-card__btns";

    const productPrice = document.createElement("div");
    productPrice.className = "product-card__price";
    productPrice.innerText = `$ ${this.props.product.price}`;

    this.choiceButton = document.createElement("button");
    this.choiceButton.className = "product-card__choice-btn button";
    this.choiceButton.innerText = "ADD TO CART";

    this.buyButton = document.createElement("button");
    this.buyButton.className = "product-card__buy-btn button";
    this.buyButton.innerText = "BUY NOW";

    controls.append(productPrice, this.choiceButton, this.buyButton);
    productCardContainer.append(title, productCardData);
    productCardData.append(productCardImagesContainer, productCardThumbnailContainer, productCardList, controls);
    this.productPageContainer.append(navContainer, productCardContainer);
    this.element.append(this.productPageContainer);
  }

  addListeners() {
    this.element.addEventListener("click", (event): void => {
      if (event.target instanceof HTMLParagraphElement && event.target === this.navItemClickable) {
        this.props.router.navigateTo(`catalog`);
      }
      for (const image of this.productImages) {
        if (event.target instanceof HTMLImageElement && event.target === image) {
          this.productCardThumbnail.src = image.src;
        }
      }
      if (event.target instanceof HTMLButtonElement && event.target === this.choiceButton) {
        if (this.choiceButton.innerText === "ADD TO CART") {
          this.choiceButton.innerText = "DROP FROM CART";
        } else {
          this.choiceButton.innerText = "ADD TO CART";
        }
        // TODO add logic for adding products to cart
      }
    });
  }
}
