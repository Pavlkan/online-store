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
        const title = document.createElement('h4');
        title.classList.add('catalog__product-title');
        title.innerText = this.props.product.title;

        this.element.append(title);
    }
}
