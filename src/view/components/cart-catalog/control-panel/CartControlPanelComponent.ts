import { BaseComponent } from '../../../BaseComponent';

type OnChange = (limitNumber: number, pageNumber: number) => void;

interface CartControlPanelComponentProps {
    onChange: OnChange;
}

export class CartControlPanelComponent extends BaseComponent<CartControlPanelComponentProps> {
    private limitInput!: HTMLInputElement;

    constructor(onChange: OnChange) {
        super('cart-page__control-panel', { onChange });
    }

    protected render(): void {
        const title = document.createElement('div');
        title.classList.add('control-panel__title');
        title.innerText = 'Products In Cart';

        const controlsContainer = document.createElement('div');
        controlsContainer.classList.add('control-panel__controls-container');

        const limit = document.createElement('div');
        limit.classList.add('control-panel__limit');
        this.limitInput = document.createElement('input');
        this.limitInput.type = 'number';
        this.limitInput.min = '1';
        limit.innerText = 'LIMIT:';
        limit.append(this.limitInput);

        const pagination = document.createElement('div');
        pagination.classList.add('control-panel__pagination');

        controlsContainer.append(limit, pagination);
        this.element.append(title, controlsContainer);
    }

    protected addListeners(): void {
        this.limitInput.addEventListener('change', () => {
            const limit = Number(this.limitInput.value);
            this.props.onChange(limit, 1);
        });
    }
}
