import { SearcherController } from "../../../../controller/SearcherController";
import { BaseComponent } from "../../../BaseComponent";

interface SearcherComponentProps {
    controller: SearcherController;
}

export class SearcherComponent extends BaseComponent<SearcherComponentProps> {
    constructor(controller: SearcherController) {
        super("control-panel__search", { controller }, "input");
    }

    render() {
        (this.element as HTMLInputElement).placeholder = "Search product";
    }
}
