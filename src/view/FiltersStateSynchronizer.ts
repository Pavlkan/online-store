import { CategoryFilterData } from '../model/filters/CategoryFilter';
import { BrandFilterData } from '../model/filters/BrandFilter';
import { OnlineStore } from '../model/OnlineStore';
import { Router } from './Router';
import { PriceFilterData } from '../model/filters/PriceFilter';
import { StockFilterData } from '../model/filters/StockFilter';

export class FiltersStateSynchronizer {
    private onlineStore: OnlineStore;
    private router: Router;

    constructor(onlineStore: OnlineStore, router: Router) {
        this.onlineStore = onlineStore;
        this.router = router;

        this.initializeFiltersState();
        this.syncFiltersStateInUrl();
    }

    private initializeFiltersState(): void {
        this.initializeCategoryFilterState();
        this.initializeBrandFilterState();
        this.initializePriceFilterState();
        this.initializeStockFilterState();
    }

    private initializeCategoryFilterState(): void {
        const categories = this.router.getQueryParam('category');
        categories.forEach((category) => this.onlineStore.getCategoryFilter().updateFilter(category, true));
    }

    private initializeBrandFilterState(): void {
        const brands = this.router.getQueryParam('brand');
        brands.forEach((brand) => this.onlineStore.getBrandFilter().updateFilter(brand, true));
    }

    private initializePriceFilterState(): void {
        const price = this.router.getQueryParam('price-range');
        if (price.length) {
            const priceProcessed = price.toString().split('-');
            this.onlineStore.getPriceFilter().touch();
            this.onlineStore.getPriceFilter().updateFilter(+priceProcessed[0], +priceProcessed[1]);
        }
    }

    private initializeStockFilterState(): void {
        const stock = this.router.getQueryParam('stock-range');
        if (stock.length) {
            const stockProcessed = stock.toString().split('-');
            this.onlineStore.getStockFilter().touch();
            this.onlineStore.getStockFilter().updateFilter(+stockProcessed[0], +stockProcessed[1]);
        }
    }

    private syncFiltersStateInUrl(): void {
        this.syncCategoryFilterStateInUrl();
        this.syncBrandFilterStateInUrl();
        this.syncPriceFilterStateInUrl();
        this.syncStockFilterStateInUrl();
    }

    private syncCategoryFilterStateInUrl(): void {
        this.onlineStore.getCategoryFilter().subscribe((category: CategoryFilterData) => {
            const filters: string[] = [];
            category.forEach((isActive, filter) => {
                if (isActive) {
                    filters.push(filter);
                }
            });
            this.router.updateQueryParams('category', filters.toString());
        });
    }

    private syncBrandFilterStateInUrl(): void {
        this.onlineStore.getBrandFilter().subscribe((brand: BrandFilterData) => {
            const filters: string[] = [];
            brand.forEach((isActive, filter) => {
                if (isActive) {
                    filters.push(filter);
                }
            });
            this.router.updateQueryParams('brand', filters.toString());
        });
    }

    private syncPriceFilterStateInUrl(): void {
        this.onlineStore.getPriceFilter().subscribe((price: PriceFilterData) => {
            if (this.onlineStore.getPriceFilter().isTouched()) {
                const priceRange = price.join('-');
                this.router.updateQueryParams('price-range', priceRange);
            } else {
                this.router.updateQueryParams('price-range', '');
            }
        });
    }

    private syncStockFilterStateInUrl(): void {
        this.onlineStore.getStockFilter().subscribe((stock: StockFilterData) => {
            if (this.onlineStore.getStockFilter().isTouched()) {
                const stockRange = stock.join('-');
                this.router.updateQueryParams('stock-range', stockRange);
            } else {
                this.router.updateQueryParams('stock-range', '');
            }
        });
    }
}
