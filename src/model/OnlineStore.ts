import { Assortment, Categories } from "./Assortment";

export class OnlineStore {
    private assortment: Assortment;

    constructor() {
        this.assortment = new Assortment();
    }

    public getProductById(id: number) {
        return this.assortment.getProductById(id);
    }

    public getCategories(): Categories {
        return this.assortment.getCategories();
    }
}
