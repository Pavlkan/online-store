import { Assortment, Categories } from "./Assortment";

export class OnlineStore {
    private assortment: Assortment;

    constructor() {
        this.assortment = new Assortment();
    }

    public getCategories(): Categories {
        return this.assortment.getCategories();
    }
}
