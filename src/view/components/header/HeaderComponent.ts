import { HeaderController } from '../../../controller/HeaderController';
import { BaseComponent } from '../../BaseComponent';
import { Router } from '../../Router';
import './header.css';

interface HeaderComponentProps {
  controller: HeaderController;
  router: Router;
}

export class HeaderComponent extends BaseComponent<HeaderComponentProps> {
  public brand!: HTMLDivElement;
  private title!: HTMLHeadingElement;
  private icon!: HTMLDivElement;

  private amountContainer!: HTMLElement;
  public cart!: HTMLImageElement;

  constructor(controller: HeaderController, router: Router) {
    super('header', { controller, router }, 'header');
  }

  protected render() {
    this.brand = document.createElement('div');
    this.brand.classList.add('header__brand');

    this.title = document.createElement('h1');
    this.title.className = 'header__title';
    this.title.innerText = 'Online Store';

    this.icon = document.createElement('div');
    this.icon.classList.add('header__icon');
    this.icon.innerText = '🛍';

    this.brand.append(this.icon, this.title);

    this.amountContainer = document.createElement('div');
    this.amountContainer.classList.add('header__amount-container');
    this.amountContainer.innerText = 'Cart total: ';

    this.cart = document.createElement('img');
    this.cart.className = 'header__cart';

    this.element.append(this.brand, this.amountContainer, this.cart);
  }

  addListeners() {
    this.element.addEventListener('click', (event): void => {
      if (event.target instanceof HTMLImageElement && event.target === this.cart) {
        this.props.router.navigateTo('cart');
      }
      if (event.target === this.brand || event.target === this.title || event.target === this.icon) {
        this.props.router.navigateTo(`catalog`);
      }
    });
  }
}
