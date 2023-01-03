import { FiltersPanelController } from "../../../controller/filters/FiltersPanelController";
import { BaseComponent } from "../../BaseComponent";
import { CategoryFilterComponent } from "./category-filter-component/CategoryFilterComponents";
import "./filters-panel.css";

interface FiltersPanelComponentProps {
    controller: FiltersPanelController;
    categoryFilter: CategoryFilterComponent;
}

export class FiltersPanelComponent extends BaseComponent<FiltersPanelComponentProps> {
    constructor(controller: FiltersPanelController, categoryFilter: CategoryFilterComponent) {
        super("filters", { controller, categoryFilter });
    }

    protected render(): void {
        this.element.append(this.props.categoryFilter.element);
    }
}
