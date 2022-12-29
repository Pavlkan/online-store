import { CatalogController } from "../../../controller/CatalogController";
import { Product } from "../../../model/Product";
import { Selection } from "../../../model/Selection";
import { BaseComponent } from "../../BaseComponent";
import { Router } from "../../Router";
import { ProductCardComponent } from "../productCard/ProductCardComponent";
import "./catalog-component.css";

interface CatalogComponentProps {
    controller: CatalogController;
    selection: Selection;
    router: Router;
    cardComponents: ProductCardComponent[];
}

export class CatalogComponent extends BaseComponent<CatalogComponentProps> {
    private subscriptionSelectionId!: number;

    constructor(controller: CatalogController, selection: Selection, router: Router) {
        super("catalog", { controller, selection, router, cardComponents: [] });
    }

    public beforeRemove(): void {
        this.props.selection.unsubscribe(this.subscriptionSelectionId);
    }

    protected render() {
        this.subscriptionSelectionId = this.props.selection.subscribe((products: Product[]): void => {
            this.renderCategoryComponents(products);
        });
    }

    private renderCategoryComponents(products: Product[]): void {
        this.props.cardComponents.forEach((component: ProductCardComponent) => component.beforeRemove());
        this.element.innerHTML = "";
        this.props.cardComponents = products.map(
            (product: Product) => new ProductCardComponent(product, this.props.router)
        );
        this.props.cardComponents.forEach((component: ProductCardComponent): void => {
            this.element.append(component.element);
        });
    }
}
