import { CartCatalogController } from '../../../controller/cart/CartCatalogController';
import { Cart } from '../../../model/Cart';
import { CartPagination } from '../../../model/CartPagination';
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
    cartPagination: CartPagination;
}

export class CartCatalogComponent extends BaseComponent<CartCatalogComponentProps> {
    private controlPanel!: CartControlPanelComponent;
    private cartSubscriptionId!: number;
    private cartPaginationSubscriptionId!: number;
    private productsContainer!: HTMLElement;

    constructor(controller: CartCatalogController, cart: Cart, router: Router, cartPagination: CartPagination) {
        super('cart-page__catalog', {
            controller,
            cart,
            router,
            productComponents: [],
            cartPagination,
        });
    }

    public beforeRemove(): void {
        this.props.cart.unsubscribe(this.cartSubscriptionId);
        this.props.cartPagination.unsubscribe(this.cartPaginationSubscriptionId);
        this.controlPanel.beforeRemove();
        this.removeProductComponents();
    }

    public getMaxLimit(): number {
        return this.props.cart.getData().size;
    }

    protected render(): void {
        this.controlPanel = new CartControlPanelComponent(
            this.onControlPanelChange.bind(this),
            this.props.cartPagination,
            this.props.cart
        );

        this.productsContainer = document.createElement('div');
        this.productsContainer.classList.add('catalog__products-container');

        this.element.append(this.controlPanel.element, this.productsContainer);

        this.cartSubscriptionId = this.props.cart.subscribe(() => {
            this.renderProductComponents();
        });

        this.cartPaginationSubscriptionId = this.props.cartPagination.subscribe(() => {
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
        const { page, limit } = this.props.cartPagination.getData();
        return Array.from(this.props.cart.getData()).slice(limit * (page - 1), limit * page);
    }

    private onControlPanelChange(limitNumber: number, pageNumber: number): void {
        this.props.controller.updatePagination(pageNumber, limitNumber);
    }

    private removeProductComponents(): void {
        this.props.productComponents.forEach((component) => {
            component.beforeRemove();
        });
        this.productsContainer.innerHTML = '';
    }
}
