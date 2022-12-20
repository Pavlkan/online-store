import { ProductPageController } from "../../../controller/pages/ProductPageController";
import { Product } from "../../../model/Product";
import { BaseComponent } from "../../BaseComponent";

interface ProductPageComponentProps {
    controller: ProductPageController;
    product: Product;
}

export class ProductPageComponent extends BaseComponent<ProductPageComponentProps> {
    constructor(controller: ProductPageController, product: Product) {
        super("product-page", { controller, product });
    }

    render(): void {
        this.element.innerText = this.props.product.title;
    }
}
