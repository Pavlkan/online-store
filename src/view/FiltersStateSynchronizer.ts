import { CategoryFilterData } from '../model/filters/CategoryFilter';
import { BrandFilterData } from '../model/filters/BrandFilter';
import { OnlineStore } from '../model/OnlineStore';
import { Router } from './Router';
import { PriceFilterData } from '../model/filters/PriceFilter';
import { StockFilterData } from '../model/filters/StockFilter';
import { CartPaginationData } from '../model/CartPagination';

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

        this.initializeSorterState();
        this.initializeSearcherState();
        this.initializeSizerState();

        this.initializeCartPaginationState();
    }

    private initializeSorterState(): void {
        const sorting = this.router.getQueryParam('sorting');
        if (sorting.length) {
            this.onlineStore.getSorter().touch();
            this.onlineStore.getSorter().notify(sorting.toString());
        }
    }

    private initializeSearcherState(): void {
        const searcher = this.router.getQueryParam('searcher');
        if (searcher.length) {
            this.onlineStore.getSearcher().notify(searcher[0]);
        }
    }

    private initializeSizerState(): void {
        const size = this.router.getQueryParam('sizing');
        if (size.length) {
            this.onlineStore.getSizer().touch();
            this.onlineStore.getSizer().notify(size[0]);
        }
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
            const priceProcessed = price[0].split('-');
            this.onlineStore.getPriceFilter().touch();
            this.onlineStore.getPriceFilter().updateFilter(+priceProcessed[0], +priceProcessed[1]);
        }
    }

    private initializeStockFilterState(): void {
        const stock = this.router.getQueryParam('stock-range');
        if (stock.length) {
            const stockProcessed = stock[0].split('-');
            this.onlineStore.getStockFilter().touch();
            this.onlineStore.getStockFilter().updateFilter(+stockProcessed[0], +stockProcessed[1]);
        }
    }

    private initializeCartPaginationState(): void {
        const limitParam = this.router.getQueryParam('pagination-limit');
        const pageParam = this.router.getQueryParam('pagination-page');

        if (limitParam.length) {
            const limit = Number(limitParam[0]);
            this.onlineStore.getCartPagination().touch();
            this.onlineStore.getCartPagination().update({ limit });
        }

        if (pageParam.length) {
            const page = Number(pageParam[0]);
            this.onlineStore.getCartPagination().touch();
            this.onlineStore.getCartPagination().update({ page });
        }
    }

    private syncFiltersStateInUrl(): void {
        this.syncCategoryFilterStateInUrl();
        this.syncBrandFilterStateInUrl();
        this.syncPriceFilterStateInUrl();
        this.syncStockFilterStateInUrl();

        this.syncSorterStateInUrl();
        this.syncSearcherStateInUrl();
        this.syncSizerStateInUrl();

        this.syncCartPaginationStateInUrl();
    }

    private syncSearcherStateInUrl(): void {
        this.onlineStore.getSearcher().subscribe((searcher: string) => {
            this.router.updateQueryParams('searcher', searcher);
        });
    }

    private syncSorterStateInUrl(): void {
        this.onlineStore.getSorter().subscribe((sorter: string) => {
            if (this.onlineStore.getSorter().isTouched()) {
                this.router.updateQueryParams('sorting', sorter);
            } else {
                this.router.updateQueryParams('sorting', '');
            }
        });
    }

    private syncSizerStateInUrl(): void {
        this.onlineStore.getSizer().subscribe((size: string) => {
            if (this.onlineStore.getSizer().isTouched()) {
                this.router.updateQueryParams('sizing', size);
            } else {
                this.router.updateQueryParams('sizing', '');
            }
        });
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

    private syncCartPaginationStateInUrl(): void {
        this.onlineStore.getCartPagination().subscribe((cartPagination: CartPaginationData) => {
            if (this.onlineStore.getCartPagination().isTouched()) {
                const { limit, page } = cartPagination;
                this.router.updateQueryParams('pagination-limit', limit.toString());
                this.router.updateQueryParams('pagination-page', page.toString());
            } else {
                this.router.updateQueryParams('pagination-limit', '');
                this.router.updateQueryParams('pagination-page', '');
            }
        });
    }
}
