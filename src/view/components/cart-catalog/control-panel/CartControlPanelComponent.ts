import { Cart } from '../../../../model/Cart';
import { CartPagination, CartPaginationData } from '../../../../model/CartPagination';
import { BaseComponent } from '../../../BaseComponent';

type OnChange = (limitNumber: number, pageNumber: number) => void;

interface CartControlPanelComponentProps {
    onChange: OnChange;
    cartPagination: CartPagination;
    cart: Cart;
}

export class CartControlPanelComponent extends BaseComponent<CartControlPanelComponentProps> {
    private limitInput!: HTMLInputElement;
    private limitLabel!: HTMLElement;
    private cartPaginationSubscriptionId!: number;
    private controlsContainer!: HTMLElement;
    private previousButton!: HTMLElement;
    private paginationCounter!: HTMLInputElement;
    private nextButton!: HTMLElement;

    constructor(onChange: OnChange, cartPagination: CartPagination, cart: Cart) {
        super('cart-page__control-panel', { onChange, cartPagination, cart });
    }

    protected render(): void {
        const title = document.createElement('div');
        title.classList.add('control-panel__title');
        title.innerText = 'Products In Cart';

        this.controlsContainer = document.createElement('div');
        this.controlsContainer.classList.add('control-panel__controls-container');

        this.createLimit();
        this.createPagination();

        this.element.append(title, this.controlsContainer);

        this.cartPaginationSubscriptionId = this.props.cartPagination.subscribe(
            (cartPagination: CartPaginationData) => {
                const { limit, page } = cartPagination;
                this.limitInput.max = this.props.cart.getData().size.toString();
                this.limitInput.value = limit.toString();
                this.paginationCounter.value = page.toString();
            }
        );
    }

    protected addListeners(): void {
        this.limitInput.addEventListener('change', () => {
            if (this.limitInput.value === '0') {
                this.limitInput.value = '1';
                return;
            }
            this.updateCartCatalog();
        });

        this.previousButton.addEventListener('click', () => {
            const currentPaginationCounter = +this.paginationCounter.value;
            if (currentPaginationCounter === 1) return;
            this.paginationCounter.value = (currentPaginationCounter - 1).toString();
            this.updateCartCatalog();
        });

        this.nextButton.addEventListener('click', () => {
            const currentPaginationCounter = +this.paginationCounter.value;
            if (currentPaginationCounter >= this.props.cartPagination.getTotalPages()) return;
            this.paginationCounter.value = (currentPaginationCounter + 1).toString();
            this.updateCartCatalog();
        });
    }

    private updateCartCatalog(): void {
        const limit = +this.limitInput.value;
        const paginationCounter = +this.paginationCounter.value;
        this.props.onChange(limit, paginationCounter);
    }

    private createLimit(): void {
        this.limitLabel = document.createElement('div');
        this.limitLabel.classList.add('control-panel__limit');
        this.limitInput = document.createElement('input');
        this.limitInput.type = 'number';
        this.limitInput.min = '1';
        this.limitLabel.innerText = 'LIMIT:';

        this.limitLabel.append(this.limitInput);

        this.controlsContainer.append(this.limitLabel);
    }

    private createPagination(): void {
        const pagination = document.createElement('div');
        pagination.classList.add('control-panel__pagination');

        this.previousButton = document.createElement('button');
        this.paginationCounter = document.createElement('input');
        this.nextButton = document.createElement('button');

        this.previousButton.classList.add('control-panel__previous-button');
        this.paginationCounter.classList.add('control-panel__pagination-counter');
        this.nextButton.classList.add('control-panel__next-button');

        this.previousButton.innerText = '<';
        this.paginationCounter.readOnly = true;
        this.nextButton.innerText = '>';

        pagination.innerText = 'PAGE: ';
        pagination.append(this.previousButton, this.paginationCounter, this.nextButton);

        this.controlsContainer.append(pagination);
    }
}
