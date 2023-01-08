import { Cart, CartData } from './Cart';
import { Observable } from './Observable';

export interface CartPaginationData {
    page: number;
    limit: number;
}

export class CartPagination extends Observable<CartPaginationData> {
    private cart: Cart;
    private touched = false;

    constructor(cart: Cart) {
        super({ page: 1, limit: 3 });
        this.cart = cart;

        this.subscribeOnCart();
    }

    public isTouched(): boolean {
        return this.touched;
    }

    public touch(): void {
        this.touched = true;
    }

    public update(data: Partial<CartPaginationData>): void {
        const totalPages = this.getTotalPages();
        const maxLimit = this.cart.getData().size || 1;
        if (data.page === 0) data.page = 1;
        if (data.limit === 0) data.limit = 1;

        if (data.page && data.page > totalPages) data.page = totalPages;
        if (data.page && data.page < 1) data.page = 1;
        if (data.limit && data.limit < 1) data.limit = 1;
        if (data.limit && data.limit > maxLimit) data.limit = maxLimit;
        this.notify({ ...this.getData(), ...data });
    }

    public getTotalPages(): number {
        if (!this.cart.getData().size) return 1;
        const { limit } = this.getData();
        return Math.ceil(this.cart.getData().size / limit);
    }

    protected compare(prev: CartPaginationData, current: CartPaginationData): boolean {
        return prev.limit === current.limit && prev.page === current.page;
    }

    private subscribeOnCart(): void {
        this.cart.subscribe((cart: CartData) => {
            if (!cart.size) {
                return this.notify({ page: 1, limit: 3 });
            }
            const { page, limit } = this.getData();
            const totalPages = this.getTotalPages();
            if (page > totalPages) {
                this.notify({ page: totalPages, limit });
            }
        });
    }
}
