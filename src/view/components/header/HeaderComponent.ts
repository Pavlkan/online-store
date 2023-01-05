import { HeaderController } from '../../../controller/HeaderController';
import { Cart } from '../../../model/Cart';
import { BaseComponent } from '../../BaseComponent';
import './header.css';
import { TotalAmountComponent } from './total-amount/TotalAmountComponent';

interface HeaderComponentProps {
    controller: HeaderController;
    cart: Cart;
}

export class HeaderComponent extends BaseComponent<HeaderComponentProps> {
    private logo!: HTMLDivElement;
    private title!: HTMLHeadingElement;
    private icon!: HTMLDivElement;
    private amountComponent!: TotalAmountComponent;
    private cartLogo!: HTMLImageElement;

    constructor(controller: HeaderController, cart: Cart) {
        super('header', { controller, cart }, 'header');
    }

    public beforeRemove(): void {
        this.amountComponent.beforeRemove();
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

        this.cartLogo = document.createElement('img');
        this.cartLogo.className = 'header__cart';

        this.element.append(this.logo, this.amountComponent.element, this.cartLogo);
    }
}
