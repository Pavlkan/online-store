import { Assortment } from '../Assortment';
import { Observable } from '../Observable';
import { Product } from '../Product';

export type PriceFilterData = number[];

export class PriceFilter extends Observable<PriceFilterData> {
    private assortment: Assortment;

    constructor(assortment: Assortment) {
        super([]);
        this.assortment = assortment;

        this.initializeFilter();
    }

    public filter(products: Product[]): Product[] {
        return products.filter((product: Product) => {
            const [minPrice, maxPrice] = this.getData();
            return product.price >= minPrice && product.price <= maxPrice;
        });
    }

    public updateFilter(min: number, max: number): void {
        const filter: PriceFilterData = [min, max];
        this.notify(filter);
    }

    private initializeFilter(): void {
        const filter = [];
        const assortmentSortedByPrice = [...this.assortment.getAssortment()].sort((a: Product, b: Product) => {
            return a.price - b.price;
        });
        filter.push(
            assortmentSortedByPrice[0].price,
            assortmentSortedByPrice[assortmentSortedByPrice.length - 1].price
        );
        this.notify(filter);
    }
}
