import { SearcherComponent } from "../view/components/control-panel/searcher/SearcherComponent";
import { BaseController } from "./BaseController";

export class SearcherController extends BaseController<SearcherComponent> {
    public component: SearcherComponent;

    constructor() {
        super();
        this.component = new SearcherComponent(this);
    }
}
