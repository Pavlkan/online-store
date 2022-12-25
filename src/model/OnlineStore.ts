import { Assortment, Categories } from "./Assortment";
import { Sorter } from "./Sorter";

export class OnlineStore {
    private assortment: Assortment;
    private sorter: Sorter;

    constructor() {
        this.assortment = new Assortment();
        this.sorter = new Sorter();
    }

    public getProductById(id: number) {
        return this.assortment.getProductById(id);
    }

    public getCategories(): Categories {
        return this.assortment.getCategories();
    }

    public getSorter(): Sorter {
        return this.sorter;
    }
}
