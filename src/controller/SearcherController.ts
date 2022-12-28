import { Searcher } from "../model/Searcher";
import { SearcherComponent } from "../view/components/control-panel/searcher/SearcherComponent";
import { BaseController } from "./BaseController";

export class SearcherController extends BaseController<SearcherComponent> {
    public component: SearcherComponent;
    private searcher: Searcher;

    constructor(searcher: Searcher) {
        super();
        this.component = new SearcherComponent(this, searcher);
        this.searcher = searcher;
    }

    public remove(): void {
        this.component.beforeRemove();
    }

    public search(str: string) {
        this.searcher.notify(str);
    }
}
