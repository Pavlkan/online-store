import { Assortment } from "./Assortment";
import { Observable } from "./Observable";
import { Product } from "./Product";

export class CounterOfFinds extends Observable<number> {
    constructor(assortment: Assortment) {
        super(assortment.getAssortment().length);
    }

    public count(products: Product[]): number {
        return products.length;
    }
}
