import { Assortment } from "./Assortment";
import { Observable } from "./Observable";
import { Product } from "./Product";
import { Sorter } from "./Sorter";

export class Selection extends Observable<Product[]> {
    private sorter: Sorter;
    private assortment: Assortment;

    constructor(sorter: Sorter, assortment: Assortment) {
        super([]);
        this.sorter = sorter;
        this.assortment = assortment;

        this.subscribeOnSorter();
    }

    private subscribeOnSorter(): void {
        this.sorter.subscribe(() => {
            const sortedProducts = this.sorter.sort(this.assortment.getAssortment());
            this.notify(sortedProducts);
        });
    }
}
