import { Assortment, Categories } from "./Assortment";
import { Product } from "./Product";
import { Searcher } from "./Searcher";
import { Selection } from "./Selection";
import { Sorter } from "./Sorter";

export class OnlineStore {
    private assortment: Assortment;
    private sorter: Sorter;
    private searcher: Searcher;
    private selection: Selection;

    constructor() {
        this.assortment = new Assortment();
        this.sorter = new Sorter();
        this.searcher = new Searcher();
        this.selection = new Selection(this.sorter, this.assortment, this.searcher);
    }

    public getProductById(id: number) {
        return this.assortment.getProductById(id);
    }

    public getCategories(): Categories {
        return this.assortment.getCategories();
    }

    public getAssortment(): Product[] {
        return this.assortment.getAssortment();
    }

    public getSorter(): Sorter {
        return this.sorter;
    }

    public getSearcher(): Searcher {
        return this.searcher;
    }

    public getSelection(): Selection {
        return this.selection;
    }
}
