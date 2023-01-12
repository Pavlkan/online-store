import { CartCatalogController } from '../../../../controller/cart/CartCatalogController';
import { Product } from '../../../../model/Product';
import { BaseComponent } from '../../../BaseComponent';
import { Router } from '../../../Router';
import './cart-product.css';

interface CartProductComponentProps {
    controller: CartCatalogController;
    product: Product;
    router: Router;
    productQuantity: number;
    index: number;
}

export class CartProductComponent extends BaseComponent<CartProductComponentProps> {
    private productInfo!: HTMLDivElement;
    private incBtn!: HTMLButtonElement;
    private decBtn!: HTMLButtonElement;
    private productQuantity!: HTMLSpanElement;

    constructor(
        controller: CartCatalogController,
        product: Product,
        router: Router,
        productQuantity: number,
        index: number
    ) {
        super('catalog__product', { controller, product, router, productQuantity, index });
    }

    protected render() {
        this.element.classList.add('inner-container');

        const productNum = document.createElement('div');
        productNum.className = 'catalog__product-num';
        productNum.innerText = `${this.props.index}`;

        this.productInfo = document.createElement('div');
        this.productInfo.className = 'catalog__product-info';

        const thumbnailWrapper = document.createElement('div');
        thumbnailWrapper.className = 'catalog__product-thumbnail-wrapper';
        const thumbnail = document.createElement('img');
        thumbnail.className = 'catalog__product-thumbnail';
        thumbnail.src = `${this.props.product.thumbnail}`;
        thumbnail.alt = 'Image of product';
        thumbnailWrapper.append(thumbnail);

        const productDetails = document.createElement('div');
        productDetails.className = 'catalog__product-details';
        productDetails.insertAdjacentHTML(
            'beforeend',
            `
      <h3 class="catalog__product-title">${this.props.product.title}</h3>
      <p class="catalog__product-description">${this.props.product.description}</p>
      <div class="catalog__product-details-other">
        <p class="catalog__product-rating">Rating: ${this.props.product.rating}</p>
        <p class="catalog__product-discount">Discount: ${this.props.product.discountPercentage}%</p>
      </div>`
        );

        this.productInfo.append(thumbnailWrapper, productDetails);

        const numberControl = document.createElement('div');
        numberControl.className = 'number-control';

        const stockControl = document.createElement('div');
        stockControl.className = 'stock-control';
        stockControl.innerText = `Stock: ${this.props.product.stock}`;

        const incDecControl = document.createElement('div');
        incDecControl.className = 'inc-dec-control';

        this.incBtn = document.createElement('button');
        this.incBtn.className = 'btn-increment';
        this.incBtn.innerText = '+';
        this.productQuantity = document.createElement('span');
        this.productQuantity.className = 'products-num';
        this.productQuantity.innerText = this.props.productQuantity.toString();

        this.decBtn = document.createElement('button');
        this.decBtn.className = 'btn-decrement';
        this.decBtn.innerText = '-';

        const amountControl = document.createElement('div');
        amountControl.className = 'amount-control';
        amountControl.innerText = `€ ${this.props.productQuantity * this.props.product.price}`;

        incDecControl.append(this.incBtn, this.productQuantity, this.decBtn);
        numberControl.append(stockControl, incDecControl, amountControl);

        this.element.append(productNum, this.productInfo, numberControl);
    }

    protected addListeners(): void {
        this.incBtn.addEventListener('click', () => {
            this.props.controller.changeProductQuantity(this.props.product, this.props.productQuantity + 1);
        });

        this.decBtn.addEventListener('click', () => {
            this.props.controller.changeProductQuantity(this.props.product, this.props.productQuantity - 1);
        });

        this.productInfo.addEventListener('click', () => {
            this.props.router.navigateTo(`product/${this.props.product.id}`);
        });
    }
}
