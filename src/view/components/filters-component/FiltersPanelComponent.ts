import { FiltersPanelController } from '../../../controller/filters/FiltersPanelController';
import { BaseComponent } from '../../BaseComponent';
import { BrandFilterComponent } from './brand-filter-component/BrandFilterComponent';
import { CategoryFilterComponent } from './category-filter-component/CategoryFilterComponents';
import { PriceFilterComponent } from './price-filter-component/PriceFilterComponent';
import { StockFilterComponent } from './stock-filter-component/StockFilterComponent';
import './filters-panel.css';

interface FiltersPanelComponentProps {
    controller: FiltersPanelController;
    categoryFilter: CategoryFilterComponent;
    brandFilter: BrandFilterComponent;
    priceFilter: PriceFilterComponent;
    stockFilter: StockFilterComponent;
}

export class FiltersPanelComponent extends BaseComponent<FiltersPanelComponentProps> {
    private resetFiltersButton!: HTMLButtonElement;
    private copyLinkButton!: HTMLButtonElement;

    constructor(
        controller: FiltersPanelController,
        categoryFilter: CategoryFilterComponent,
        brandFilter: BrandFilterComponent,
        priceFilter: PriceFilterComponent,
        stockFilter: StockFilterComponent
    ) {
        super('filters', { controller, categoryFilter, brandFilter, priceFilter, stockFilter });
    }

    protected render(): void {
        const buttonContainer = document.createElement('div');
        this.resetFiltersButton = document.createElement('button');
        this.copyLinkButton = document.createElement('button');

        buttonContainer.classList.add('filters__button-container');
        this.resetFiltersButton.classList.add('filters__reset-filters-button');
        this.resetFiltersButton.classList.add('button');
        this.copyLinkButton.classList.add('filters__copy-filters-button');
        this.copyLinkButton.classList.add('button');

        this.resetFiltersButton.innerText = 'Reset filters';
        this.copyLinkButton.innerText = 'Copy link';

        buttonContainer.append(this.resetFiltersButton, this.copyLinkButton);

        const { categoryFilter, brandFilter, priceFilter, stockFilter } = this.props;
        this.element.append(
            buttonContainer,
            categoryFilter.element,
            brandFilter.element,
            priceFilter.element,
            stockFilter.element
        );
    }

    protected addListeners(): void {
        this.resetFiltersButton.addEventListener('click', () => {
            this.props.controller.resetFilters();
        });

        this.copyLinkButton.addEventListener('click', () => {
            this.props.controller.copyFilters();
            this.copyLinkButton.innerText = 'Copied!';
            this.copyLinkButton.classList.add('_copied');

            setTimeout(() => {
                this.copyLinkButton.innerText = 'Copy link';
                this.copyLinkButton.classList.remove('_copied');
            }, 3000);
        });
    }
}
