import { Assortment, Categories } from './Assortment';
import { BrandFilter } from './BrandFilter';
import { CategoryFilter } from './CategoryFilter';
import { CounterOfFinds } from './CounterOfFinds';
import { Filters } from './Filters';
import { Product } from './Product';
import { Searcher } from './Searcher';
import { Selection } from './Selection';
import { Sorter } from './Sorter';

export class OnlineStore {
    private assortment: Assortment;
    private sorter: Sorter;
    private counterOfFinds: CounterOfFinds;
    private searcher: Searcher;
    private categoryFilter: CategoryFilter;
    private brandFilter: BrandFilter;
    private filters: Filters;
    private selection: Selection;

    constructor() {
        this.assortment = new Assortment();
        this.sorter = new Sorter();
        this.counterOfFinds = new CounterOfFinds(this.assortment);
        this.searcher = new Searcher();

        this.categoryFilter = new CategoryFilter(this.assortment);
        this.brandFilter = new BrandFilter(this.assortment);
        this.filters = new Filters(this.categoryFilter, this.brandFilter);

        this.selection = new Selection(this.assortment, this.sorter, this.counterOfFinds, this.searcher, this.filters);
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

    public getFilters() {
        return this.filters;
    }

    public getCategoryFilter(): CategoryFilter {
        return this.categoryFilter;
    }

    public getBrandFilter(): BrandFilter {
        return this.brandFilter;
    }
}
