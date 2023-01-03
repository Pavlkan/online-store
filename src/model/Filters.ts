import { BrandFilter } from './BrandFilter';
import { CategoryFilter } from './CategoryFilter';
import { Observable } from './Observable';
import { Product } from './Product';

export class Filters extends Observable<void> {
    private categoryFilter: CategoryFilter;
    private brandFilter: BrandFilter;

    constructor(categoryFilter: CategoryFilter, brandFilter: BrandFilter) {
        super();
        this.categoryFilter = categoryFilter;
        this.brandFilter = brandFilter;

        this.subscribeOnFilters();
    }

    public filter(products: Product[]): Product[] {
        const categorizedProducts = this.categoryFilter.filter(products);
        const brandedProducts = this.brandFilter.filter(categorizedProducts);
        return brandedProducts;
    }

    public getCategoryFilter() {
        return this.categoryFilter;
    }

    private subscribeOnFilters(): void {
        this.categoryFilter.subscribe(() => {
            this.notify(undefined, false);
        });

        this.brandFilter.subscribe(() => {
            this.notify(undefined, false);
        });
    }
}
