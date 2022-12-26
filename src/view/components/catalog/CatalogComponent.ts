import { CatalogController } from "../../../controller/CatalogController";
import { Product } from "../../../model/Product";
import { BaseComponent } from "../../BaseComponent";
import { Router } from "../../Router";
import { ProductCardComponent } from "../productCard/ProductCardComponent";
import "./catalog-component.css";

interface CatalogComponentProps {
    controller: CatalogController;
    assortment: Product[];
    router: Router;
}

export class CatalogComponent extends BaseComponent<CatalogComponentProps> {
    constructor(controller: CatalogController, assortment: Product[], router: Router) {
        super("catalog", { controller, assortment, router }, "dev");
    }

    render() {
        this.createCategoryComponent().forEach((productCard) => {
            this.element.append(productCard.element);
        });
    }

    private createCategoryComponent(): ProductCardComponent[] {
        return this.props.assortment.map((product: Product): ProductCardComponent => {
            return new ProductCardComponent(product, this.props.router);
        });
    }
}
