import { PriceFilterController } from '../../../../controller/filters/PriceFilterController';
import { PriceFilter } from '../../../../model/filters/PriceFilter';
import { BaseComponent } from '../../../BaseComponent';
import './price-filter.css';

interface PriceFilterComponentProps {
    controller: PriceFilterController;
    priceFilter: PriceFilter;
}

export class PriceFilterComponent extends BaseComponent<PriceFilterComponentProps> {
    private priceFilterSubscriptionId!: number;
    private sliderOne!: HTMLElement;
    private sliderTwo!: HTMLElement;
    private minPrice!: HTMLElement;
    private maxPrice!: HTMLElement;

    constructor(controller: PriceFilterController, priceFilter: PriceFilter) {
        super('filters__price-filter', { controller, priceFilter });
    }

    public beforeRemove(): void {
        this.props.priceFilter.unsubscribe(this.priceFilterSubscriptionId);
    }

    protected render(): void {
        this.createFilterInterface();

        this.priceFilterSubscriptionId = this.props.priceFilter.subscribe((priceRange: number[]) => {
            (this.sliderOne as HTMLInputElement).value = `${priceRange[0]}`;
            (this.sliderTwo as HTMLInputElement).value = `${priceRange[1]}`;
            this.minPrice.innerText = `€${priceRange[0]}`;
            this.maxPrice.innerText = `€${priceRange[1]}`;
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
        const filter = this.props.priceFilter.getData();

        const numericPanel = document.createElement('div');
        this.minPrice = document.createElement('span');
        const arrow = document.createElement('span');
        this.maxPrice = document.createElement('span');

        numericPanel.classList.add('price-filter__numeric-panel');
        this.minPrice.classList.add('price-filter__min');
        arrow.classList.add('price-filter__arrow');
        this.maxPrice.classList.add('price-filter__max');
        this.minPrice.id = 'range1';
        this.maxPrice.id = 'range2';

        this.minPrice.innerText = `€${filter[0]}`;
        arrow.innerText = '⟷';
        this.maxPrice.innerText = `€${filter[1]}`;

        numericPanel.append(this.minPrice, arrow, this.maxPrice);
        this.element.append(numericPanel);
    }

    private createRangeElement() {
        const filter = this.props.priceFilter.getData();

        const rangeContainer = document.createElement('div');
        const sliderTrack = document.createElement('div');
        this.sliderOne = document.createElement('input');
        this.sliderTwo = document.createElement('input');

        rangeContainer.classList.add('price-filter__range-container');
        sliderTrack.classList.add('price-filter__slider-track');
        this.sliderOne.classList.add('price-filter__circle');
        this.sliderTwo.classList.add('price-filter__circle');

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
