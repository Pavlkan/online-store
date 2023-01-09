import { CatalogController } from '../../../controller/CatalogController';
import { Cart, CartData } from '../../../model/Cart';
import { Product } from '../../../model/Product';
import { Sizer } from '../../../model/Sizer';
import { BaseComponent } from '../../BaseComponent';
import { Router } from '../../Router';
import './product-card.css';

interface ProductCardComponentProps {
    controller: CatalogController;
    product: Product;
    router: Router;
    cart: Cart;
    sizer: Sizer;
}

export class ProductCardComponent extends BaseComponent<ProductCardComponentProps> {
    private choiceButton!: HTMLElement;
    private detailsButton!: HTMLElement;
    private cartSubscriptionId!: number;
    private sizerSubscriptionId!: number;

    constructor(controller: CatalogController, product: Product, router: Router, cart: Cart, sizer: Sizer) {
        super('product-card', { controller, product, router, cart, sizer });
    }

    public beforeRemove(): void {
        this.props.cart.unsubscribe(this.cartSubscriptionId);
        this.props.sizer.unsubscribe(this.sizerSubscriptionId);
    }

    protected render() {
        this.element.classList.add('inner-container');

        const title = document.createElement('h4');
        title.className = 'product-card__title title';
        title.innerText = this.props.product.title;

        const content = document.createElement('div');
        content.classList.add('product-title__content');

        const description = document.createElement('div');
        description.classList.add('product-card__description');
        description.insertAdjacentHTML(
            'afterbegin',
            `
                <p class="description__item">Category: ${this.props.product.category}</p>
                <p class="description__item">Brand: ${this.props.product.brand}</p>
                <p class="description__item">Price: ${this.props.product.price}</p>
                <p class="description__item">Discount: ${this.props.product.discountPercentage}</p>
                <p class="description__item">Rating: ${this.props.product.rating}</p>
                <p class="description__item">Stock: ${this.props.product.stock}</p>
            `
        );

        const controls = document.createElement('div');
        controls.classList.add('product-card__controls');

        this.choiceButton = document.createElement('button');
        this.choiceButton.className = 'product-card__choice-button button';
        this.choiceButton.innerText = 'Add to card';

        this.detailsButton = document.createElement('button');
        this.detailsButton.classList.add('product-card__details-button');
        this.detailsButton.classList.add('button');
        this.detailsButton.innerText = 'Details';

        controls.append(this.choiceButton, this.detailsButton);
        content.append(description, controls);
        this.element.append(title, content);
        this.element.style.background = `url('${this.props.product.thumbnail}') 0% 0% / cover`;

        this.cartSubscriptionId = this.props.cart.subscribe((cart: CartData) => {
            if (cart.has(this.props.product)) {
                this.choiceButton.innerText = 'Drop from cart';
                this.element.classList.add('product-card-in-cart');
            } else {
                this.choiceButton.innerText = 'Add to cart';
                this.element.classList.remove('product-card-in-cart');
            }
        });

        this.sizerSubscriptionId = this.props.sizer.subscribe((size: string) => {
            if (size === 'small') {
                this.element.classList.add('small');
            } else {
                this.element.classList.remove('small');
            }
        });
    }

    protected addListeners() {
        this.element.addEventListener('click', (event): void => {
            if (event.target instanceof HTMLElement) {
                if (event.target === this.choiceButton) {
                    return;
                }
                this.props.router.navigateTo(`product/${this.props.product.id}`);
            }
        });

        this.choiceButton.addEventListener('click', (): void => {
            this.props.controller.toggleProduct(this.props.product);
        });
    }
}
