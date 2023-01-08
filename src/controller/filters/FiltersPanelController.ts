import { BrandFilter } from '../../model/filters/BrandFilter';
import { CategoryFilter } from '../../model/filters/CategoryFilter';
import { PriceFilter } from '../../model/filters/PriceFilter';
import { StockFilter } from '../../model/filters/StockFilter';
import { OnlineStore } from '../../model/OnlineStore';
import { Product } from '../../model/Product';
import { FiltersPanelComponent } from '../../view/components/filters-component/FiltersPanelComponent';
import { Router } from '../../view/Router';
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
    private onlineStore: OnlineStore;
    private selectionSubscriptionId!: number;
    private router: Router;

    constructor(
        categoryFilter: CategoryFilter,
        brandFilter: BrandFilter,
        priceFilter: PriceFilter,
        stockFilter: StockFilter,
        onlineStore: OnlineStore,
        router: Router
    ) {
        super();
        this.categoryFilterController = new CategoryFilterController(
            categoryFilter,
            onlineStore.getAssortment(),
            onlineStore.getSelection()
        );
        this.brandFilterController = new BrandFilterController(
            brandFilter,
            onlineStore.getAssortment(),
            onlineStore.getSelection()
        );
        this.priceFilterController = new PriceFilterController(priceFilter);
        this.stockFilterController = new StockFilterController(stockFilter);
        this.component = new FiltersPanelComponent(
            this,
            this.categoryFilterController.component,
            this.brandFilterController.component,
            this.priceFilterController.component,
            this.stockFilterController.component
        );
        this.onlineStore = onlineStore;
        this.router = router;

        this.updateRangeFilters();
    }

    public remove(): void {
        this.categoryFilterController.remove();
        this.brandFilterController.remove();
        this.priceFilterController.remove();
        this.stockFilterController.remove();
        this.onlineStore.getSelection().unsubscribe(this.selectionSubscriptionId);
        this.component.beforeRemove();
    }

    public resetFilters(): void {
        this.onlineStore.getFilters().resetFilters();
    }

    public copyFilters(): void {
        const url = this.router.getFullUrl();
        navigator.clipboard.writeText(url);
    }

    private updateRangeFilters(): void {
        this.selectionSubscriptionId = this.onlineStore.getSelection().subscribe((products: Product[]) => {
            if (!this.onlineStore.getPriceFilter().isTouched()) {
                this.onlineStore.getPriceFilter().updateRange(products);
            }
        });
    }
}
