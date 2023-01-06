import { ProductPageController } from '../../../controller/pages/ProductPageController';
import { Cart, CartData } from '../../../model/Cart';
import { Product } from '../../../model/Product';
import { BaseComponent } from '../../BaseComponent';
import { Router } from '../../Router';
import './product-page.css';

interface ProductPageComponentProps {
    controller: ProductPageController;
    product: Product;
    router: Router;
    cart: Cart;
}

export class ProductPageComponent extends BaseComponent<ProductPageComponentProps> {
    private productPageContainer!: HTMLDivElement;
    private choiceButton!: HTMLButtonElement;
    private buyButton!: HTMLButtonElement;
    private productImages!: HTMLImageElement[];
    private productCardThumbnail!: HTMLImageElement;
    private navItemClickable!: HTMLParagraphElement;
    private cartSubscriptionId!: number;

    constructor(controller: ProductPageController, product: Product, router: Router, cart: Cart) {
        super('product-description-page', { controller, product, router, cart }, 'div');
    }

    public beforeRemove(): void {
        this.props.cart.unsubscribe(this.cartSubscriptionId);
    }

    protected render(): void {
        this.productPageContainer = document.createElement('div');
        this.productPageContainer.className = 'product-description-page-container outer-container';

        const navContainer = document.createElement('div');
        navContainer.className = 'nav-container';

        this.navItemClickable = document.createElement('p');
        this.navItemClickable.className = 'nav-container__item_clickable';
        this.navItemClickable.innerText = 'STORE';
        navContainer.append(this.navItemClickable);

        navContainer.insertAdjacentHTML(
            'beforeend',
            `
          <span> >> </span>
          <p class="nav-container__item">${this.props.product.category}</p>
          <span> >> </span>
          <p class="nav-container__item">${this.props.product.brand}</p>
          <span> >> </span>
          <p class="nav-container__item">${this.props.product.title}</p>
        `
        );
        const productCardContainer = document.createElement('div');
        productCardContainer.className = 'product-card-container inner-container';

        const title = document.createElement('h4');
        title.className = 'description-page-product-card__title title';
        title.innerText = this.props.product.title;

        const productCardDetails = document.createElement('div');
        productCardDetails.className = 'description-page-product-card__details';

        const productCardImagesContainer = document.createElement('div');
        productCardImagesContainer.className = 'description-page-description-page-product-card__images-container';

        this.productImages = this.props.product.images.map((source) => {
            const image = document.createElement('img');
            image.className = 'description-page-product-card__image';
            image.src = source;
            image.alt = 'Image of product';

            return image;
        });

        productCardImagesContainer.append(...this.productImages);

        const productCardThumbnailContainer = document.createElement('div');
        productCardThumbnailContainer.className = 'description-page-product-card-thumbnail-container';
        this.productCardThumbnail = document.createElement('img');
        this.productCardThumbnail.className = 'description-page-product-card__thumbnail';
        this.productCardThumbnail.src = `${this.props.product.thumbnail}`;
        this.productCardThumbnail.alt = 'Image of product';
        productCardThumbnailContainer.append(this.productCardThumbnail);

        const productCardList = document.createElement('div');
        productCardList.className = 'description-page-product-card__list';

        productCardList.insertAdjacentHTML(
            'beforeend',
            `
        <div class="product-card-list__content">
          <p class="description-page-description__item">Description: ${this.props.product.description}</p>
          <p class="description-page-description__item">Discount: ${this.props.product.discountPercentage}</p>
          <p class="description-page-description__item">Rating: ${this.props.product.rating}</p>
          <p class="description-page-description__item">Stock: ${this.props.product.stock}</p>
          <p class="description-page-description__item">Brand: ${this.props.product.brand}</p>
          <p class="description-page-description__item">Category: ${this.props.product.category}</p>
        </div>`
        );

        const controls = document.createElement('div');
        controls.className = 'description-page-product-card-controls';

        const productPrice = document.createElement('div');
        productPrice.className = 'description-page-product-card__price';
        productPrice.innerText = `$ ${this.props.product.price}`;

        this.choiceButton = document.createElement('button');
        this.choiceButton.className = 'description-page-product-card__choice-btn button';
        this.choiceButton.innerText = 'ADD TO CART';

        this.buyButton = document.createElement('button');
        this.buyButton.className = 'description-page-product-card__buy-btn button';
        this.buyButton.innerText = 'BUY NOW';

        controls.append(productPrice, this.choiceButton, this.buyButton);
        productCardContainer.append(title, productCardDetails);
        productCardDetails.append(productCardImagesContainer, productCardThumbnailContainer, productCardList,
           controls);
        this.productPageContainer.append(navContainer, productCardContainer);
        this.element.append(this.productPageContainer);

        this.subscribeOnCart();
    }

    protected addListeners() {
        this.element.addEventListener('click', (event): void => {
            if (event.target instanceof HTMLParagraphElement && event.target === this.navItemClickable) {
                this.props.router.navigateTo(`catalog`);
            }
            if (event.target instanceof HTMLButtonElement && event.target === this.buyButton) {
                this.props.router.navigateTo(`cart`);
            }
            for (const image of this.productImages) {
                if (event.target instanceof HTMLImageElement && event.target === image) {
                    this.productCardThumbnail.src = image.src;
                }
            }
            if (event.target instanceof HTMLButtonElement && event.target === this.choiceButton) {
                this.props.controller.toggleProduct(this.props.product);
            }
        });
    }

    private subscribeOnCart() {
        this.cartSubscriptionId = this.props.cart.subscribe((cart: CartData) => {
            if (cart.has(this.props.product)) {
                this.choiceButton.innerText = 'Drop from cart';
            } else {
                this.choiceButton.innerText = 'Add to cart';
            }
        });
    }
}
