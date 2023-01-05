import { CategoryFilter } from '../../model/filters/CategoryFilter';
import { CategoryFilterComponent } from '../../view/components/filters-component/category-filter-component/CategoryFilterComponents';
import { BaseController } from '../BaseController';

export class CategoryFilterController extends BaseController<CategoryFilterComponent> {
    public component: CategoryFilterComponent;
    private categoryFilter: CategoryFilter;

    constructor(categoryFilter: CategoryFilter) {
        super();
        this.categoryFilter = categoryFilter;
        this.component = new CategoryFilterComponent(this, this.categoryFilter);
    }

    public remove(): void {
        this.component.beforeRemove();
    }

    public filter(category: string, selected: boolean): void {
        this.categoryFilter.updateFilter(category, selected);
    }
}
