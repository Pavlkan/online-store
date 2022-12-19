import { CatalogController } from "../../../controller/CatalogController";
import { Categories } from "../../../model/Assortment";
import { Product } from "../../../model/Product";
import { BaseComponent } from "../../BaseComponent";
import { ProductCardComponent } from "../productCardComponent/ProductCardComponent";
import "./catalog-component.css";

interface CatalogComponentProps {
    controller: CatalogController;
    categories: Categories;
}

export class CatalogComponent extends BaseComponent<CatalogComponentProps> {
    constructor(controller: CatalogController, categories: Categories) {
        super("catalog", { controller, categories }, "dev");
    }

    render() {
        for (const category of this.props.categories.keys()) {
            this.createCategoryComponent(category).forEach((productCard) => {
                this.element.append(productCard.element);
            });
        }
    }

    private createCategoryComponent(category: string): ProductCardComponent[] {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.props.categories.get(category)!.map((product: Product): ProductCardComponent => {
            return new ProductCardComponent(product);
        });
    }
}
