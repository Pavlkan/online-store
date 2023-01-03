import { Assortment } from './Assortment';
import { Observable } from './Observable';
import { Product } from './Product';

export type BrandFilterData = Map<string, boolean>;

export class BrandFilter extends Observable<BrandFilterData> {
    private assortment: Assortment;

    constructor(assortment: Assortment) {
        super(new Map());
        this.assortment = assortment;

        this.initializeFilter();
    }

    public filter(products: Product[]): Product[] {
        if (!this.isTouched()) return products;
        return products.filter((product: Product) => {
            return this.getData().get(product.brand);
        });
    }

    public updateFilter(brand: string, selected: boolean): void {
        const filter: BrandFilterData = new Map(this.getData());
        filter.set(brand, selected);
        this.notify(filter);
    }

    private initializeFilter(): void {
        const filter: BrandFilterData = new Map();
        this.assortment.getBrands().forEach((_, brand) => {
            filter.set(brand, false);
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
