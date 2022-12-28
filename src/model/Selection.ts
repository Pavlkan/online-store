import { Assortment } from "./Assortment";
import { CounterOfFinds } from "./CounterOfFinds";
import { Observable } from "./Observable";
import { Product } from "./Product";
import { Searcher } from "./Searcher";
import { Sorter } from "./Sorter";

export class Selection extends Observable<Product[]> {
    private assortment: Assortment;
    private sorter: Sorter;
    private counterOfFinds: CounterOfFinds;
    private searcher: Searcher;

    constructor(assortment: Assortment, sorter: Sorter, counterOfFinds: CounterOfFinds, searcher: Searcher) {
        super([]);
        this.assortment = assortment;
        this.sorter = sorter;
        this.counterOfFinds = counterOfFinds;
        this.searcher = searcher;

        this.subscribeOnSearch();
        this.subscribeOnSorter();
    }

    private subscribeOnSearch(): void {
        this.searcher.subscribe(() => {
            const searchedProducts = this.searcher.search(this.assortment.getAssortment());
            this.notify(searchedProducts);
            this.counterOfFinds.notify(this.counterOfFinds.count(searchedProducts));
        });
    }

    private subscribeOnSorter(): void {
        this.sorter.subscribe(() => {
            const sortedProducts = this.sorter.sort(this.assortment.getAssortment());
            this.notify(sortedProducts);
        });
    }
}
