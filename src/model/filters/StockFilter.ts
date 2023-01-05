import { Assortment } from '../Assortment';
import { Observable } from '../Observable';
import { Product } from '../Product';

export type StockFilterData = number[];

export class StockFilter extends Observable<StockFilterData> {
    private assortment: Assortment;

    constructor(assortment: Assortment) {
        super([]);
        this.assortment = assortment;

        this.initializeFilter();
    }

    public filter(products: Product[]): Product[] {
        return products.filter((product: Product) => {
            const [minStock, maxStock] = this.getData();
            return product.stock >= minStock && product.stock <= maxStock;
        });
    }

    public updateFilter(min: number, max: number): void {
        const filter: StockFilterData = [min, max];
        this.notify(filter);
    }

    private initializeFilter(): void {
        const filter = [];
        const assortmentSortedByStock = [...this.assortment.getAssortment()].sort((a: Product, b: Product) => {
            return a.stock - b.stock;
        });
        filter.push(
            assortmentSortedByStock[0].stock,
            assortmentSortedByStock[assortmentSortedByStock.length - 1].stock
        );
        this.notify(filter);
    }
}
