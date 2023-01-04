import { StockFilter } from '../../model/StockFilter';
import { StockFilterComponent } from '../../view/components/filters-component/stock-filter-component/StockFilterComponent';
import { BaseController } from '../BaseController';

export class StockFilterController extends BaseController<StockFilterComponent> {
    public component: StockFilterComponent;
    private stockFilter: StockFilter;

    constructor(stockFilter: StockFilter) {
        super();
        this.stockFilter = stockFilter;
        this.component = new StockFilterComponent(this, this.stockFilter);
    }

    public remove(): void {
        this.component.beforeRemove();
    }

    public filter(min: number, max: number): void {
        this.stockFilter.updateFilter(min, max);
    }
}
