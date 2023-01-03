import { CategoryFilter } from "../../model/CategoryFilter";
import { FiltersPanelComponent } from "../../view/components/filters-component/FiltersPanelComponent";
import { BaseController } from "../BaseController";
import { CategoryFilterController } from "./CategoryFilterController";

export class FiltersPanelController extends BaseController<FiltersPanelComponent> {
    public component: FiltersPanelComponent;

    private categoryFilterController: CategoryFilterController;

    constructor(categoryFilter: CategoryFilter) {
        super();
        this.categoryFilterController = new CategoryFilterController(categoryFilter);
        this.component = new FiltersPanelComponent(this, this.categoryFilterController.component);
    }

    public remove(): void {
        this.categoryFilterController.remove();
        this.component.beforeRemove();
    }
}
