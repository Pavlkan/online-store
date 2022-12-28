import { Assortment } from "./Assortment";
import { Observable } from "./Observable";
import { Product } from "./Product";
import { Searcher } from "./Searcher";
import { Sorter } from "./Sorter";

export class Selection extends Observable<Product[]> {
    private assortment: Assortment;
    private sorter: Sorter;
    private searcher: Searcher;

    constructor(sorter: Sorter, assortment: Assortment, searcher: Searcher) {
        super([]);
        this.sorter = sorter;
        this.assortment = assortment;
        this.searcher = searcher;

        this.subscribeOnSearch();
        this.subscribeOnSorter();
    }

    private subscribeOnSearch(): void {
        this.searcher.subscribe(() => {
            const searchedProducts = this.searcher.search(this.assortment.getAssortment());
            this.notify(searchedProducts);
        });
    }

    private subscribeOnSorter(): void {
        this.sorter.subscribe(() => {
            const sortedProducts = this.sorter.sort(this.assortment.getAssortment());
            this.notify(sortedProducts);
        });
    }
}
