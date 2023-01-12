import { SearcherController } from "../../../../controller/SearcherController";
import { Searcher } from "../../../../model/Searcher";
import { BaseComponent } from "../../../BaseComponent";

interface SearcherComponentProps {
    controller: SearcherController;
    searcher: Searcher;
}

export class SearcherComponent extends BaseComponent<SearcherComponentProps> {
    private searcherSubscriptionId!: number;

    constructor(controller: SearcherController, searcher: Searcher) {
        super("control-panel__search", { controller, searcher }, "input");
    }

    public beforeRemove(): void {
        this.props.searcher.unsubscribe(this.searcherSubscriptionId);
    }

    protected render() {
        (this.element as HTMLInputElement).placeholder = "Search product";

        this.subscribeOnSearch();
    }

    protected addListeners(): void {
        this.element.addEventListener("input", () => {
            this.props.controller.search((this.element as HTMLInputElement).value);
        });
    }

    private subscribeOnSearch(): void {
        this.searcherSubscriptionId = this.props.searcher.subscribe((searchSymbols: string) => {
            (this.element as HTMLInputElement).value = searchSymbols;
        });
    }
}
