import { StockFilterController } from '../../../../controller/filters/StockFilterController';
import { StockFilter } from '../../../../model/StockFilter';
import { BaseComponent } from '../../../BaseComponent';

interface StockFilterComponentProps {
    controller: StockFilterController;
    stockFilter: StockFilter;
}

export class StockFilterComponent extends BaseComponent<StockFilterComponentProps> {
    private stockFilterSubscriptionId!: number;
    private sliderOne!: HTMLElement;
    private sliderTwo!: HTMLElement;
    private minStock!: HTMLElement;
    private maxStock!: HTMLElement;

    constructor(controller: StockFilterController, stockFilter: StockFilter) {
        super('filters__stock-filter', { controller, stockFilter });
    }

    public beforeRemove(): void {
        this.props.stockFilter.unsubscribe(this.stockFilterSubscriptionId);
    }

    protected render(): void {
        this.createFilterInterface();

        this.stockFilterSubscriptionId = this.props.stockFilter.subscribe((stockRange: number[]) => {
            (this.sliderOne as HTMLInputElement).value = `${stockRange[0]}`;
            (this.sliderTwo as HTMLInputElement).value = `${stockRange[1]}`;
            this.minStock.innerText = `${stockRange[0]}`;
            this.maxStock.innerText = `${stockRange[1]}`;
        });
    }

    private createFilterInterface() {
        this.createNumericPanel();
        this.createRangeElement();
    }

    protected addListeners(): void {
        this.element.addEventListener('input', (event) => {
            if (event.target instanceof HTMLInputElement) {
                const valueOne = Number((this.sliderOne as HTMLInputElement).value);
                const valueTwo = Number((this.sliderTwo as HTMLInputElement).value);
                this.props.controller.filter(Math.min(valueOne, valueTwo), Math.max(valueOne, valueTwo));
            }
        });
    }

    private createNumericPanel() {
        const filter = this.props.stockFilter.getData();

        const numericPanel = document.createElement('div');
        this.minStock = document.createElement('span');
        const arrow = document.createElement('span');
        this.maxStock = document.createElement('span');

        numericPanel.classList.add('stock-filter__numeric-panel');
        this.minStock.classList.add('stock-filter__min');
        arrow.classList.add('stock-filter__arrow');
        this.maxStock.classList.add('stock-filter__max');
        this.minStock.id = 'range1';
        this.maxStock.id = 'range2';

        this.minStock.innerText = `${filter[0]}`;
        arrow.innerText = '⟷';
        this.maxStock.innerText = `${filter[1]}`;

        numericPanel.append(this.minStock, arrow, this.maxStock);
        this.element.append(numericPanel);
    }

    private createRangeElement() {
        const filter = this.props.stockFilter.getData();

        const rangeContainer = document.createElement('div');
        const sliderTrack = document.createElement('div');
        this.sliderOne = document.createElement('input');
        this.sliderTwo = document.createElement('input');

        rangeContainer.classList.add('stock-filter__range-container');
        sliderTrack.classList.add('stock-filter__slider-track');
        this.sliderOne.classList.add('stock-filter__circle');
        this.sliderTwo.classList.add('stock-filter__circle');

        (this.sliderOne as HTMLInputElement).type = 'range';
        (this.sliderTwo as HTMLInputElement).type = 'range';
        (this.sliderOne as HTMLInputElement).id = 'slider-1';
        (this.sliderTwo as HTMLInputElement).id = 'slider-2';
        (this.sliderOne as HTMLInputElement).min = `${filter[0]}`;
        (this.sliderTwo as HTMLInputElement).min = `${filter[0]}`;
        (this.sliderOne as HTMLInputElement).max = `${filter[1]}`;
        (this.sliderTwo as HTMLInputElement).max = `${filter[1]}`;
        (this.sliderOne as HTMLInputElement).value = `${filter[0]}`;
        (this.sliderTwo as HTMLInputElement).value = `${filter[1]}`;

        rangeContainer.append(sliderTrack, this.sliderOne, this.sliderTwo);
        this.element.append(rangeContainer);
    }
}
