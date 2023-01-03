import { BrandFilter } from '../../model/BrandFilter';
import { CategoryFilter } from '../../model/CategoryFilter';
import { FiltersPanelComponent } from '../../view/components/filters-component/FiltersPanelComponent';
import { BaseController } from '../BaseController';
import { BrandFilterController } from './BrandFilterController';
import { CategoryFilterController } from './CategoryFilterController';

export class FiltersPanelController extends BaseController<FiltersPanelComponent> {
    public component: FiltersPanelComponent;
    private categoryFilterController: CategoryFilterController;
    private brandFilterController: BrandFilterController;

    constructor(categoryFilter: CategoryFilter, brandFilter: BrandFilter) {
        super();
        this.categoryFilterController = new CategoryFilterController(categoryFilter);
        this.brandFilterController = new BrandFilterController(brandFilter);
        this.component = new FiltersPanelComponent(
            this,
            this.categoryFilterController.component,
            this.brandFilterController.component
        );
    }

    public remove(): void {
        this.categoryFilterController.remove();
        this.brandFilterController.remove();
        this.component.beforeRemove();
    }
}
