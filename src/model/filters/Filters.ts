import { BrandFilter } from './BrandFilter';
import { CategoryFilter } from './CategoryFilter';
import { Observable } from '../Observable';
import { PriceFilter } from './PriceFilter';
import { Product } from '../Product';
import { StockFilter } from './StockFilter';

export class Filters extends Observable<void> {
    private categoryFilter: CategoryFilter;
    private brandFilter: BrandFilter;
    private priceFilter: PriceFilter;
    private stockFilter: StockFilter;

    constructor(
        categoryFilter: CategoryFilter,
        brandFilter: BrandFilter,
        priceFilter: PriceFilter,
        stockFilter: StockFilter
    ) {
        super();
        this.categoryFilter = categoryFilter;
        this.brandFilter = brandFilter;
        this.priceFilter = priceFilter;
        this.stockFilter = stockFilter;

        this.subscribeOnFilters();
    }

    public filter(products: Product[]): Product[] {
        const categorizedProducts = this.categoryFilter.filter(products);
        const brandedProducts = this.brandFilter.filter(categorizedProducts);
        const pricedProducts = this.priceFilter.filter(brandedProducts);
        const stockedProducts = this.stockFilter.filter(pricedProducts);
        return stockedProducts;
    }

    public resetFilters(): void {
        // TODO Stock
        this.brandFilter.resetFilter();
        this.categoryFilter.resetFilter();
        this.priceFilter.resetFilter();
    }

    private subscribeOnFilters(): void {
        this.categoryFilter.subscribe(() => {
            this.notify(undefined, false);
        });

        this.brandFilter.subscribe(() => {
            this.notify(undefined, false);
        });

        this.priceFilter.subscribe(() => {
            this.notify(undefined, false);
        });

        this.stockFilter.subscribe(() => {
            this.notify(undefined, false);
        });
    }
}
