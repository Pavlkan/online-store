import { FiltersPanelController } from '../../../controller/filters/FiltersPanelController';
import { BaseComponent } from '../../BaseComponent';
import { BrandFilterComponent } from './brand-filter-component/BrandFilterComponent';
import { CategoryFilterComponent } from './category-filter-component/CategoryFilterComponents';
import './filters-panel.css';

interface FiltersPanelComponentProps {
    controller: FiltersPanelController;
    categoryFilter: CategoryFilterComponent;
    brandFilter: BrandFilterComponent;
}

export class FiltersPanelComponent extends BaseComponent<FiltersPanelComponentProps> {
    constructor(
        controller: FiltersPanelController,
        categoryFilter: CategoryFilterComponent,
        brandFilter: BrandFilterComponent
    ) {
        super('filters', { controller, categoryFilter, brandFilter });
    }

    protected render(): void {
        this.element.append(this.props.categoryFilter.element, this.props.brandFilter.element);
    }
}
