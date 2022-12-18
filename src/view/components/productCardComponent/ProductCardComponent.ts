import { Product } from "../../../model/Product";
import { BaseComponent } from "../../BaseComponent";

interface ProductCardComponentProps {
    product: Product;
}

export class ProductCardComponent extends BaseComponent<ProductCardComponentProps> {
    constructor(product: Product) {
        super("product-card", { product });
    }

    render() {
        this.element.innerText = this.props.product.title;
    }
}
