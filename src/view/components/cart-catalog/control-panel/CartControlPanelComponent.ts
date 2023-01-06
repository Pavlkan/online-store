import { BaseComponent } from '../../../BaseComponent';
import { CartCatalogComponent } from '../CartCatalogComponent';

type OnChange = (limitNumber: number, pageNumber: number) => void;

interface CartControlPanelComponentProps {
    cartCatalogComponent: CartCatalogComponent;
    onChange: OnChange;
}

export class CartControlPanelComponent extends BaseComponent<CartControlPanelComponentProps> {
    private limitInput!: HTMLInputElement;
    private controlsContainer!: HTMLElement;
    private previousButton!: HTMLElement;
    private paginationCounter!: HTMLInputElement;
    private nextButton!: HTMLElement;

    constructor(cartCatalogComponent: CartCatalogComponent, onChange: OnChange) {
        super('cart-page__control-panel', { cartCatalogComponent, onChange });
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
    }

    protected addListeners(): void {
        this.limitInput.addEventListener('change', () => {
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
            const limit = +this.limitInput.value;
            if (+currentPaginationCounter >= this.props.cartCatalogComponent.getMaxLimit() / limit) return;
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
        const limit = document.createElement('div');
        limit.classList.add('control-panel__limit');
        this.limitInput = document.createElement('input');
        this.limitInput.type = 'number';
        this.limitInput.min = '1';
        this.limitInput.max = this.props.cartCatalogComponent.getMaxLimit().toString();
        this.limitInput.value = '3';
        limit.innerText = 'LIMIT:';

        limit.append(this.limitInput);

        this.controlsContainer.append(limit);
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
        this.paginationCounter.value = '1';
        this.nextButton.innerText = '>';

        pagination.innerText = 'PAGE: ';
        pagination.append(this.previousButton, this.paginationCounter, this.nextButton);

        this.controlsContainer.append(pagination);
    }
}
