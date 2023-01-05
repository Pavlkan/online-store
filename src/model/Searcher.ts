import { Observable } from './Observable';
import { Product } from './Product';

export class Searcher extends Observable<string> {
    constructor() {
        super('');
    }

    public search(products: Product[]): Product[] {
        return products.filter((product: Product) => {
            let flag = false;
            if (this.getData() === '') return true;
            for (const prop in product) {
                if (prop === 'id' || prop === 'thumbnail' || prop === 'images') continue;
                if (this.isIncludes(product[prop as keyof Product])) {
                    flag = true;
                    break;
                }
            }
            return flag;
        });
    }

    private isIncludes(data: string | number | string[]): boolean {
        if (Array.isArray(data)) return false;
        if (typeof data === 'number') {
            return data.toString() === this.getData().toLowerCase();
        }
        return data.toLowerCase().includes(this.getData().toLowerCase());
    }
}
