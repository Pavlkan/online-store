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
        const { categoryFilter, brandFilter, priceFilter, stockFilter } = this.props;
        this.element.append(categoryFilter.element, brandFilter.element, priceFilter.element, stockFilter.element);
    }
}
