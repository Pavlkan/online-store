import { CartSummaryController } from '../../../controller/cart/CartSummaryController';
import { Cart } from '../../../model/Cart';
import { BaseComponent } from '../../BaseComponent';
import { Modal } from '../../modal/Modal';
import { Router } from '../../Router';
import { PurchaseFormComponent } from '../purchase-form/PurchaseFormComponent';

interface CartSummaryComponentProps {
    controller: CartSummaryController;
    cart: Cart;
    router: Router;
}

export class CartSummaryComponent extends BaseComponent<CartSummaryComponentProps> {
    private cartSubscriptionId!: number;
    private quantity!: HTMLElement;
    private amount!: HTMLElement;
    private promoCodeContainer!: HTMLElement;
    private promoCodeInput!: HTMLInputElement;
    private buyButton!: HTMLButtonElement;

    constructor(controller: CartSummaryController, cart: Cart, router: Router) {
        super('cart-page__summary', { controller, cart, router });
    }

    public beforeRemove(): void {
        this.props.cart.unsubscribe(this.cartSubscriptionId);
    }

    protected render(): void {
        const title = document.createElement('div');
        this.buyButton = document.createElement('button');

        title.classList.add('summery__title');
        this.buyButton.classList.add('summery__buy-button');

        title.innerText = 'Summary';
        this.buyButton.innerText = 'BUY NOW';

        this.element.append(title);
        this.createCartInfoSection();
        this.createPromoCodeSection();
        this.element.append(this.buyButton);

        this.cartSubscriptionId = this.props.cart.subscribe(() => {
            this.quantity.innerText = `${this.props.cart.getProductsQuantity()}`;
            this.amount.innerText = `€${this.props.cart.getAmount()}`;
        });
    }

    protected addListeners(): void {
        this.promoCodeInput.addEventListener('input', () => {
            const currentValue = this.promoCodeInput.value.toUpperCase();
            if (currentValue === 'RS') {
                // TODO drop RS discount
            }
            if (currentValue === 'EPM') {
                // TODO drop EPM discount
            }
        });

        this.buyButton.addEventListener('click', () => {
            const modal = new Modal();
            const form = new PurchaseFormComponent(this.props.controller, this.props.router, modal);
            modal.attach(form.element);
        });
    }

    private createCartInfoSection(): void {
        const cartInfoContainer = document.createElement('div');
        const quantityContainer = document.createElement('div');
        this.quantity = document.createElement('div');
        const amountContainer = document.createElement('div');
        this.amount = document.createElement('div');

        cartInfoContainer.classList.add('summary__info-container');
        quantityContainer.classList.add('summary__quantity-container');
        this.quantity.classList.add('summary__quantity');
        amountContainer.classList.add('summary__amount-container');
        this.amount.classList.add('summary__amount');

        quantityContainer.innerText = 'Products:';
        this.quantity.innerText = `${this.props.cart.getProductsQuantity()}`;
        amountContainer.innerText = 'Total:';
        this.amount.innerText = `€${this.props.cart.getAmount()}`;

        quantityContainer.append(this.quantity);
        amountContainer.append(this.amount);
        cartInfoContainer.append(quantityContainer, amountContainer);

        this.element.append(cartInfoContainer);
    }

    private createPromoCodeSection() {
        this.promoCodeContainer = document.createElement('div');
        this.promoCodeInput = document.createElement('input');
        const promoCodeGuidance = document.createElement('p');

        this.promoCodeContainer.classList.add('summary__promo-code-container');
        this.promoCodeInput.classList.add('summary__promo-code-input');
        promoCodeGuidance.classList.add('summary__promo-code-guidance');

        this.promoCodeInput.placeholder = 'Enter promo code';
        promoCodeGuidance.innerText = "Promo for test: 'RS', 'EPM'";

        this.promoCodeContainer.append(this.promoCodeInput, promoCodeGuidance);
        this.element.append(this.promoCodeContainer);
    }
}
