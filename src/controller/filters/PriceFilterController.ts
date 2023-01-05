import { PriceFilter } from '../../model/filters/PriceFilter';
import { PriceFilterComponent } from '../../view/components/filters-component/price-filter-component/PriceFilterComponent';
import { BaseController } from '../BaseController';

export class PriceFilterController extends BaseController<PriceFilterComponent> {
    public component: PriceFilterComponent;
    private priceFilter: PriceFilter;

    constructor(priceFilter: PriceFilter) {
        super();
        this.priceFilter = priceFilter;
        this.component = new PriceFilterComponent(this, this.priceFilter);
    }

    public remove(): void {
        this.component.beforeRemove();
    }

    public filter(min: number, max: number): void {
        this.priceFilter.updateFilter(min, max);
    }
}
