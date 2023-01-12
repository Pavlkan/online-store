import { Assortment } from '../../model/Assortment';
import { BrandFilter } from '../../model/filters/BrandFilter';
import { Selection } from '../../model/Selection';
import { BrandFilterComponent } from '../../view/components/filters-component/brand-filter-component/BrandFilterComponent';
import { BaseController } from '../BaseController';

export class BrandFilterController extends BaseController<BrandFilterComponent> {
    public component: BrandFilterComponent;
    private brandFilter: BrandFilter;

    constructor(brandFilter: BrandFilter, assortment: Assortment, select: Selection) {
        super();
        this.brandFilter = brandFilter;
        this.component = new BrandFilterComponent(this, this.brandFilter, assortment, select);
    }

    public remove(): void {
        this.component.beforeRemove();
    }

    public filter(brand: string, selected: boolean): void {
        this.brandFilter.updateFilter(brand, selected);
    }
}
