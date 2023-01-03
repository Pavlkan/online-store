import { Assortment } from "./Assortment";
import { Observable } from "./Observable";
import { Product } from "./Product";

export type CategoryFilterData = Map<string, boolean>;

export class CategoryFilter extends Observable<CategoryFilterData> {
    private assortment: Assortment;

    constructor(assortment: Assortment) {
        super(new Map());
        this.assortment = assortment;

        this.initializeFilter();
    }

    public filter(products: Product[]): Product[] {
        if (!this.isTouched()) return products;
        return products.filter((product: Product) => {
            return this.getData().get(product.category);
        });
    }

    public updateFilter(category: string, selected: boolean): void {
        const filter: CategoryFilterData = new Map(this.getData());
        filter.set(category, selected);
        this.notify(filter);
    }

    private initializeFilter(): void {
        const filter: CategoryFilterData = new Map();
        this.assortment.getCategories().forEach((_, category) => {
            filter.set(category, false);
        });
        this.notify(filter);
    }

    private isTouched(): boolean {
        let isTouched = false;
        this.getData().forEach((value) => {
            if (value) isTouched = true;
        });
        return isTouched;
    }
}
