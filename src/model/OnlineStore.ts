import { Assortment, Categories } from "./Assortment";
import { CounterOfFinds } from "./CounterOfFinds";
import { Product } from "./Product";
import { Searcher } from "./Searcher";
import { Selection } from "./Selection";
import { Sorter } from "./Sorter";

export class OnlineStore {
    private assortment: Assortment;
    private sorter: Sorter;
    private counterOfFinds: CounterOfFinds;
    private searcher: Searcher;
    private selection: Selection;

    constructor() {
        this.assortment = new Assortment();
        this.sorter = new Sorter();
        this.counterOfFinds = new CounterOfFinds(this.assortment);
        this.searcher = new Searcher();
        this.selection = new Selection(this.assortment, this.sorter, this.counterOfFinds, this.searcher);
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

    public getCounterOfFinds(): CounterOfFinds {
        return this.counterOfFinds;
    }

    public getSearcher(): Searcher {
        return this.searcher;
    }

    public getSelection(): Selection {
        return this.selection;
    }
}
