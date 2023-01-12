import { Assortment } from './Assortment';
import { CounterOfFinds } from './CounterOfFinds';
import { Filters } from './filters/Filters';
import { Observable } from './Observable';
import { Product } from './Product';
import { Searcher } from './Searcher';
import { Sizer } from './Sizer';
import { Sorter } from './Sorter';

export class Selection extends Observable<Product[]> {
    private assortment: Assortment;
    private sorter: Sorter;
    private sizer: Sizer;
    private counterOfFinds: CounterOfFinds;
    private searcher: Searcher;
    private filters: Filters;

    constructor(
        assortment: Assortment,
        sorter: Sorter,
        counterOfFinds: CounterOfFinds,
        searcher: Searcher,
        filters: Filters,
        sizer: Sizer
    ) {
        super([]);
        this.assortment = assortment;
        this.sorter = sorter;
        this.counterOfFinds = counterOfFinds;
        this.searcher = searcher;
        this.sizer = sizer;
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
        this.sizer.notify(this.sizer.getData());
        this.counterOfFinds.notify(this.counterOfFinds.count(filteredProducts));
    }
}
