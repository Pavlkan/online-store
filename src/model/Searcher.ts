import { Observable } from "./Observable";
import { Product } from "./Product";

export class Searcher extends Observable<string> {
    constructor() {
        super("");
    }

    public search(products: Product[]): Product[] {
        return products.filter((product: Product) => {
            if (this.data === "") return true;
            return product.title.toLowerCase().includes(this.data.toLowerCase());
        });
    }
}
