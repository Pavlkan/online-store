import { BrandFilter } from '../../model/filters/BrandFilter';
import { CategoryFilter } from '../../model/filters/CategoryFilter';
import { PriceFilter } from '../../model/filters/PriceFilter';
import { StockFilter } from '../../model/filters/StockFilter';
import { OnlineStore } from '../../model/OnlineStore';
import { FiltersPanelComponent } from '../../view/components/filters-component/FiltersPanelComponent';
import { BaseController } from '../BaseController';
import { BrandFilterController } from './BrandFilterController';
import { CategoryFilterController } from './CategoryFilterController';
import { PriceFilterController } from './PriceFilterController';
import { StockFilterController } from './StockFilterController';

export class FiltersPanelController extends BaseController<FiltersPanelComponent> {
    public component: FiltersPanelComponent;
    private categoryFilterController: CategoryFilterController;
    private brandFilterController: BrandFilterController;
    private priceFilterController: PriceFilterController;
    private stockFilterController: StockFilterController;

    constructor(
        categoryFilter: CategoryFilter,
        brandFilter: BrandFilter,
        priceFilter: PriceFilter,
        stockFilter: StockFilter,
        onlineStore: OnlineStore
    ) {
        super();
        this.categoryFilterController = new CategoryFilterController(
            categoryFilter,
            onlineStore.getAssortment(),
            onlineStore.getSelection()
        );
        this.brandFilterController = new BrandFilterController(brandFilter);
        this.priceFilterController = new PriceFilterController(priceFilter);
        this.stockFilterController = new StockFilterController(stockFilter);
        this.component = new FiltersPanelComponent(
            this,
            this.categoryFilterController.component,
            this.brandFilterController.component,
            this.priceFilterController.component,
            this.stockFilterController.component
        );
    }

    public remove(): void {
        this.categoryFilterController.remove();
        this.brandFilterController.remove();
        this.priceFilterController.remove();
        this.stockFilterController.remove();
        this.component.beforeRemove();
    }
}
