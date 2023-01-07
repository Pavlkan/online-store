import { Assortment } from '../Assortment';
import { Observable } from '../Observable';
import { Product } from '../Product';

export type PriceFilterData = [number, number];

export class PriceFilter extends Observable<PriceFilterData> {
    private assortment: Assortment;
    private touched = false;
    private readonly maxRange: PriceFilterData;

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

    public isTouched(): boolean {
        return this.touched;
    }

    public touch(): void {
        this.touched = true;
    }

    public getMaxRange(): PriceFilterData {
        return this.maxRange;
    }

    public filter(products: Product[]): Product[] {
        if (!this.isTouched()) return products;
        return products.filter((product: Product) => {
            const [minPrice, maxPrice] = this.getData();
            return product.price >= minPrice && product.price <= maxPrice;
        });
    }

    public resetFilter(): void {
        this.touched = false;
        this.updateRange(this.assortment.getAssortment());
    }

    public updateFilter(min: number, max: number): void {
        const filter: PriceFilterData = [min, max];
        this.notify(filter);
    }

    protected compare(prev: PriceFilterData, current: PriceFilterData): boolean {
        return prev[0] === current[0] && prev[1] === current[1];
    }

    private getRange(products: Product[]): PriceFilterData {
        const filter = [];
        const assortmentSortedByPrice = [...products].sort((a: Product, b: Product) => {
            return a.price - b.price;
        });
        filter.push(
            assortmentSortedByPrice[0].price,
            assortmentSortedByPrice[assortmentSortedByPrice.length - 1].price
        );

        return filter as PriceFilterData;
    }
}
