import { CartCatalogController } from '../../../controller/cart/CartCatalogController';
import { Cart, CartData } from '../../../model/Cart';
import { Product } from '../../../model/Product';
import { BaseComponent } from '../../BaseComponent';
import { Router } from '../../Router';
import { CartProductComponent } from './cart-product/CartProductComponent';
import { CartControlPanelComponent } from './control-panel/CartControlPanelComponent';

interface CartCatalogComponentProps {
    controller: CartCatalogController;
    cart: Cart;
    router: Router;
    productComponents: CartProductComponent[];
    limit: number;
    page: number;
    cartData: CartData;
}

export class CartCatalogComponent extends BaseComponent<CartCatalogComponentProps> {
    private controlPanel!: CartControlPanelComponent;
    private cartSubscriptionId!: number;
    private productsContainer!: HTMLElement;

    constructor(controller: CartCatalogController, cart: Cart, router: Router) {
        super('cart-page__catalog', {
            controller,
            cart,
            router,
            productComponents: [],
            limit: 3,
            page: 1,
            cartData: new Map(),
        });
    }

    public beforeRemove(): void {
        this.props.cart.unsubscribe(this.cartSubscriptionId);
        this.controlPanel.beforeRemove();
        this.removeProductComponents();
    }

    protected render(): void {
        this.controlPanel = new CartControlPanelComponent(this.onControlPanelChange.bind(this));

        this.productsContainer = document.createElement('div');
        this.productsContainer.classList.add('catalog__products-container');

        this.element.append(this.controlPanel.element, this.productsContainer);

        this.cartSubscriptionId = this.props.cart.subscribe((cart: CartData) => {
            this.props.cartData = cart;
            this.renderProductComponents();
        });
    }

    private renderProductComponents(): void {
        this.removeProductComponents();
        this.props.productComponents = this.getPaginationData().map(([product, quantity], index) => {
            return new CartProductComponent(this.props.controller, product, this.props.router, quantity, index + 1);
        });
        this.props.productComponents.forEach((component) => this.productsContainer.append(component.element));
    }

    private getPaginationData(): [Product, number][] {
        return Array.from(this.props.cartData).slice(this.props.limit * (this.props.page - 1), this.props.limit * this.props.page);
    }

    private onControlPanelChange(limitNumber: number, pageNumber: number): void {
        this.props.limit = limitNumber;
        this.props.page = pageNumber;
        this.renderProductComponents();
    }

    private removeProductComponents(): void {
        this.props.productComponents.forEach((component) => {
            component.beforeRemove();
        });
        this.productsContainer.innerHTML = '';
    }
}
