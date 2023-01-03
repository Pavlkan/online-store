import { Assortment } from "./Assortment";
import { CounterOfFinds } from "./CounterOfFinds";
import { Filters } from "./Filters";
import { Observable } from "./Observable";
import { Product } from "./Product";
import { Searcher } from "./Searcher";
import { Sorter } from "./Sorter";

export class Selection extends Observable<Product[]> {
    private assortment: Assortment;
    private sorter: Sorter;
    private counterOfFinds: CounterOfFinds;
    private searcher: Searcher;
    private filters: Filters;

    constructor(
        assortment: Assortment,
        sorter: Sorter,
        counterOfFinds: CounterOfFinds,
        searcher: Searcher,
        filters: Filters
    ) {
        super([]);
        this.assortment = assortment;
        this.sorter = sorter;
        this.counterOfFinds = counterOfFinds;
        this.searcher = searcher;
        this.filters = filters;

        this.subscribeOnControlPanel();
    }

    private subscribeOnControlPanel() {
        this.subscribeOnSearch();
        this.subscribeOnSorter();
        this.subscribeOnFilters();
    }

    private subscribeOnSearch(): void {
        this.searcher.subscribe(() => {
            this.selectProducts();
        });
    }

    private subscribeOnSorter(): void {
        this.sorter.subscribe(() => {
            this.selectProducts();
        });
    }

    private subscribeOnFilters(): void {
        this.filters.subscribe(() => {
            this.selectProducts();
        });
    }

    private selectProducts(): void {
        const searchedProducts = this.searcher.search(this.assortment.getAssortment());
        const sortedProducts = this.sorter.sort(searchedProducts);
        const filteredProducts = this.filters.filter(sortedProducts);
        this.notify(filteredProducts);
        this.counterOfFinds.notify(this.counterOfFinds.count(filteredProducts));
    }
}
