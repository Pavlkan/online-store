import { Observable } from "./Observable";
import { Product } from "./Product";

export class Sorter extends Observable<string> {
    private readonly sortStrategies = new Map([
        ["Sort by price ASC", (products: Product[]) => products],
        ["Sort by price DESC", (products: Product[]) => products],
        ["Sort by rating ASC", (products: Product[]) => products],
        ["Sort by rating DESC", (products: Product[]) => products],
        ["Sort by discount ASC", (products: Product[]) => products],
        ["Sort by discount DESC", (products: Product[]) => products],
    ]);

    constructor() {
        super("Sort by price ASC");
    }

    public sort(products: Product[]): Product[] {
        const strategy = this.sortStrategies.get(this.getData());
        return strategy?.(products) ?? products;
    }

    public getOptions(): string[] {
        return Array.from(this.sortStrategies.keys());
    }
}
