import { CatalogController } from "../../../controller/CatalogController";
import { Categories } from "../../../model/Assortment";
import { Product } from "../../../model/Product";
import { BaseComponent } from "../../BaseComponent";
import { Router } from "../../Router";
import { ProductCardComponent } from "../productCard/ProductCardComponent";
import "./catalog-component.css";

interface CatalogComponentProps {
    controller: CatalogController;
    categories: Categories;
    router: Router;
}

export class CatalogComponent extends BaseComponent<CatalogComponentProps> {
    constructor(controller: CatalogController, categories: Categories, router: Router) {
        super("catalog", { controller, categories, router }, "dev");
    }

    render() {
        for (const category of this.props.categories.keys()) {
            this.createCategoryComponent(category).forEach((productCard) => {
                this.element.append(productCard.element);
            });
        }
        // TODO Use assortment arr instead of categories
    }

    private createCategoryComponent(category: string): ProductCardComponent[] {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.props.categories.get(category)!.map((product: Product): ProductCardComponent => {
            return new ProductCardComponent(product, this.props.router);
        });
    }
}
