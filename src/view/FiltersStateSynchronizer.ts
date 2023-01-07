import { CategoryFilterData } from '../model/filters/CategoryFilter';
import { OnlineStore } from '../model/OnlineStore';
import { Router } from './Router';

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
        const categories = this.router.getQueryParam('category');
        categories.forEach((category) => this.onlineStore.getCategoryFilter().updateFilter(category, true));
    }

    private syncFiltersStateInUrl(): void {
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
}
