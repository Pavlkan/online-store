import { CatalogPageController } from "../../../controller/pages/CatalogPageController";
import { BaseComponent } from "../../BaseComponent";
import { CatalogComponent } from "../../components/catalog/CatalogComponent";

interface CatalogPageProps {
    controller: CatalogPageController;
    catalogComponent: CatalogComponent;
}

export class CatalogPageComponent extends BaseComponent<CatalogPageProps> {
    constructor(controller: CatalogPageController, catalogComponent: CatalogComponent) {
        super("catalog-section", { controller, catalogComponent }, "section");
    }

    render() {
        this.element.append(this.props.catalogComponent.element);
    }
}
