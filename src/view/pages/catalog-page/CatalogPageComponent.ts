import { CatalogPageController } from "../../../controller/pages/CatalogPageController";
import { BaseComponent } from "../../BaseComponent";
import { CatalogComponent } from "../../components/catalog/CatalogComponent";
import { ControlPanelComponent } from "../../components/control-panel/ControlPanelComponent";
import { FiltersPanelComponent } from "../../components/filters-component/FiltersPanelComponent";
import "./catalog-page.css";

interface CatalogPageProps {
    controller: CatalogPageController;
    filterPanel: FiltersPanelComponent;
    controlPanel: ControlPanelComponent;
    catalogComponent: CatalogComponent;
}

export class CatalogPageComponent extends BaseComponent<CatalogPageProps> {
    constructor(
        controller: CatalogPageController,
        filterPanel: FiltersPanelComponent,
        controlPanel: ControlPanelComponent,
        catalogComponent: CatalogComponent
    ) {
        super("catalog-page", { controller, filterPanel, controlPanel, catalogComponent }, "section");
    }

    render() {
        const catalog = document.createElement("div");
        catalog.classList.add("catalog-page__controls-and-products");
        catalog.append(this.props.controlPanel.element, this.props.catalogComponent.element);

        this.element.append(this.props.filterPanel.element, catalog);
    }
}
