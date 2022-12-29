import { CatalogPageController } from "../../../controller/pages/CatalogPageController";
import { BaseComponent } from "../../BaseComponent";
import { CatalogComponent } from "../../components/catalog/CatalogComponent";
import { ControlPanelComponent } from "../../components/control-panel/ControlPanelComponent";

interface CatalogPageProps {
    controller: CatalogPageController;
    controlPanel: ControlPanelComponent;
    catalogComponent: CatalogComponent;
}

export class CatalogPageComponent extends BaseComponent<CatalogPageProps> {
    constructor(
        controller: CatalogPageController,
        controlPanel: ControlPanelComponent,
        catalogComponent: CatalogComponent
    ) {
        super("catalog-section", { controller, controlPanel, catalogComponent }, "section");
    }

    render() {
        this.element.append(this.props.controlPanel.element, this.props.catalogComponent.element);
    }
}
