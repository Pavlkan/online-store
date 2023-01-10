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
    private promoCodeButton!: HTMLButtonElement;
    private promoCode!: HTMLElement;
    private usedPromoCodesContainer!: HTMLElement;

    constructor(controller: CartSummaryController, cart: Cart, router: Router) {
        super('cart-page__summary', { controller, cart, router });
    }

    public beforeRemove(): void {
        this.props.cart.unsubscribe(this.cartSubscriptionId);
    }

    protected render(): void {
        this.element.classList.add('inner-container');
        const title = document.createElement('div');
        this.buyButton = document.createElement('button');

        title.classList.add('summary__title');
        title.classList.add('title');
        this.buyButton.classList.add('summary__buy-button');
        this.buyButton.classList.add('button');

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
                const rsPromoCode = document.getElementById('RS-promo-code');

                if (rsPromoCode) return;

                this.addPromoCode('RS-promo-code');
                this.runPromoCode();

                this.promoCodeButton.addEventListener('click', () => {
                    const rsPromoCode = document.getElementById('RS-promo-code');
                    this.erasePromoCode();
                    rsPromoCode?.remove();
                });
            }

            if (currentValue === 'EPM') {
                const EpmPromoCode = document.getElementById('EPM-promo-code');

                if (EpmPromoCode) return;

                this.addPromoCode('EPM-promo-code');
                this.runPromoCode();

                this.promoCodeButton.addEventListener('click', () => {
                    const EpmPromoCode = document.getElementById('EPM-promo-code');
                    this.erasePromoCode();
                    EpmPromoCode?.remove();
                });
            }
        });

        this.buyButton.addEventListener('click', () => {
            const modal = new Modal();
            const form = new PurchaseFormComponent(this.props.cart, this.props.router, modal);
            modal.attach(form.element);
        });
    }

    private runPromoCode(): void {
        this.props.cart.addPromoCode();
        this.props.cart.notify(new Map(this.props.cart.getData()));
        this.amount.innerHTML = `
        <del>€${this.props.cart.getStandartPrice()}</del><br>
        €${this.props.cart.getAmount()}
        `;
    }

    private erasePromoCode(): void {
        if (!document.getElementById('EPM-promo-code') && document.getElementById('RS-promo-code')) {
            this.amount.innerText = `€${this.props.cart.getAmount()}`;
        }
        this.props.cart.removePromoCode();
        this.props.cart.notify(new Map(this.props.cart.getData()));
    }

    private addPromoCode(promoCodeType: string): void {
        this.promoCode = document.createElement('div');
        this.promoCode.id = promoCodeType;
        const promoCodeText = document.createElement('div');
        this.promoCodeButton = document.createElement('button');

        this.promoCode.classList.add('promo-code__container');
        promoCodeText.classList.add('promo-code__text');
        this.promoCodeButton.classList.add('promo-code__button');
        this.promoCodeButton.classList.add('button');

        promoCodeText.innerText = `${promoCodeType} -10%`;
        this.promoCodeButton.innerText = 'DROP';
        this.promoCodeButton.innerText = 'DROP';

        this.promoCode.append(promoCodeText, this.promoCodeButton);
        this.usedPromoCodesContainer.append(this.promoCode);
    }

    private createCartInfoSection(): void {
        const cartInfoContainer = document.createElement('div');
        const quantityContainer = document.createElement('div');
        this.quantity = document.createElement('div');
        const amountContainer = document.createElement('div');
        this.amount = document.createElement('div');
        this.usedPromoCodesContainer = document.createElement('div');

        cartInfoContainer.classList.add('summary__info-container');
        quantityContainer.classList.add('summary__quantity-container');
        this.quantity.classList.add('summary__quantity');
        amountContainer.classList.add('summary__amount-container');
        this.amount.classList.add('summary__amount');
        this.usedPromoCodesContainer.classList.add('summary__promo-codes-container');

        quantityContainer.innerText = 'Products:';
        this.quantity.innerText = `${this.props.cart.getProductsQuantity()}`;
        amountContainer.innerText = 'Total:';
        this.amount.innerText = `€${this.props.cart.getAmount()}`;

        quantityContainer.append(this.quantity);
        amountContainer.append(this.amount);
        cartInfoContainer.append(quantityContainer, amountContainer);

        this.element.append(cartInfoContainer, this.usedPromoCodesContainer);
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
