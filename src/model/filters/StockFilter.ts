import { Assortment } from '../Assortment';
import { Observable } from '../Observable';
import { Product } from '../Product';

export type StockFilterData = [number, number];

export class StockFilter extends Observable<StockFilterData> {
    private assortment: Assortment;
    private touched = false;
    private readonly maxRange: StockFilterData;

    constructor(assortment: Assortment) {
        super([0, 0]);
        this.assortment = assortment;
        this.maxRange = this.getRange(this.assortment.getAssortment());

        this.updateRange(this.assortment.getAssortment());
    }

    public updateRange(products: Product[]): void {
        const filter = this.getRange(products);
        this.notify(filter);
    }

    public updateFilter(min: number, max: number): void {
        const filter: StockFilterData = [min, max];
        this.notify(filter);
    }

    public isTouched(): boolean {
        return this.touched;
    }

    public touch(): void {
        this.touched = true;
    }

    public getMaxRange(): StockFilterData {
        return this.maxRange;
    }

    public filter(products: Product[]): Product[] {
        if (!this.isTouched()) return products;
        return products.filter((product: Product) => {
            const [minStock, maxStock] = this.getData();
            return product.stock >= minStock && product.stock <= maxStock;
        });
    }

    public resetFilter(): void {
        this.touched = false;
        this.updateRange(this.assortment.getAssortment());
    }

    protected compare(prev: StockFilterData, current: StockFilterData): boolean {
        return prev[0] === current[0] && prev[1] === current[1];
    }

    private getRange(products: Product[]): StockFilterData {
        const filter = [];
        const assortmentSortedByStock = [...products].sort((a: Product, b: Product) => {
            return a.stock - b.stock;
        });
        if (assortmentSortedByStock.length) {
            filter.push(
                assortmentSortedByStock[0].stock,
                assortmentSortedByStock[assortmentSortedByStock.length - 1].stock
            );
        } else {
            filter.push(0, 0);
        }

        return filter as StockFilterData;
    }
}
