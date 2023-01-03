import { Assortment } from "./Assortment";
import { CategoryFilter } from "./CategoryFilter";
import { Observable } from "./Observable";
import { Product } from "./Product";

export class Filters extends Observable<void> {
    private categoryFilter: CategoryFilter;
    private assortment: Assortment;

    constructor(assortment: Assortment, categoryFilter: CategoryFilter) {
        super();
        this.assortment = assortment;
        this.categoryFilter = categoryFilter;

        this.subscribeOnFilters();
    }

    public filter(products: Product[]): Product[] {
        const categorizedProducts = this.categoryFilter.filter(products);
        return categorizedProducts;
    }

    public getCategoryFilter() {
        return this.categoryFilter;
    }

    private subscribeOnFilters(): void {
        this.categoryFilter.subscribe(() => {
            this.notify(undefined, false);
        });
    }
}
