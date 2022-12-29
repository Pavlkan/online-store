import { Observable } from "./Observable";
import { Product } from "./Product";

export class Sorter extends Observable<string> {
    private readonly sortStrategies = new Map([
        ["Sort by price ASC", (products: Product[]) => [...products].sort((a, b) => a.price - b.price)],
        ["Sort by price DESC", (products: Product[]) => [...products].sort((a, b) => b.price - a.price)],
        ["Sort by rating ASC", (products: Product[]) => [...products].sort((a, b) => a.rating - b.rating)],
        ["Sort by rating DESC", (products: Product[]) => [...products].sort((a, b) => b.rating - a.rating)],
        [
            "Sort by discount ASC",
            (products: Product[]) => [...products].sort((a, b) => a.discountPercentage - b.discountPercentage),
        ],
        [
            "Sort by discount DESC",
            (products: Product[]) => [...products].sort((a, b) => b.discountPercentage - a.discountPercentage),
        ],
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
