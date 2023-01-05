import { HeaderController } from '../../../controller/HeaderController';
import { Cart } from '../../../model/Cart';
import { BaseComponent } from '../../BaseComponent';
import { Router } from '../../Router';
import { CartIconComponent } from './cart-icon/CartIconComponent';
import './header.css';
import { TotalAmountComponent } from './total-amount/TotalAmountComponent';

interface HeaderComponentProps {
    controller: HeaderController;
    cart: Cart;
    router: Router;
}

export class HeaderComponent extends BaseComponent<HeaderComponentProps> {
    private logo!: HTMLDivElement;
    private title!: HTMLHeadingElement;
    private icon!: HTMLDivElement;
    private amountComponent!: TotalAmountComponent;
    private cartIconComponent!: CartIconComponent;

    constructor(controller: HeaderController, cart: Cart, router: Router) {
        super('header', { controller, cart, router }, 'header');
    }

    public beforeRemove(): void {
        this.amountComponent.beforeRemove();
        this.cartIconComponent.beforeRemove();
    }

    protected render() {
        this.logo = document.createElement('div');
        this.logo.classList.add('header__logo');

        this.title = document.createElement('h1');
        this.title.className = 'header__title';
        this.title.innerText = 'Online Store';

        this.icon = document.createElement('div');
        this.icon.classList.add('header__icon');
        this.icon.innerText = '🛍';

        this.logo.append(this.icon, this.title);

        this.amountComponent = new TotalAmountComponent(this.props.cart);
        this.cartIconComponent = new CartIconComponent(this.props.cart, this.props.router);

        this.element.append(this.logo, this.amountComponent.element, this.cartIconComponent.element);
    }
}
