import { BaseController } from "../controller/BaseController";
import { CatalogPageController } from "../controller/pages/CatalogPageController";
import { OnlineStore } from "../model/OnlineStore"; //===============================

export class Router {
    private onlineStore: OnlineStore;
    private pageMap: Map<string, () => BaseController>;
    private container: HTMLElement;
    private currentPage?: string;
    private pageController?: BaseController;

    constructor(container: HTMLElement, onlineStore: OnlineStore) {
        this.container = container;
        this.onlineStore = onlineStore;
        this.pageMap = new Map([["catalogPage", () => new CatalogPageController(this.onlineStore)]]);
    }

    public navigateTo(page: string) {
        const factory = this.pageMap.get(page);
        if (!factory || this.currentPage === page) return;

        this.pageController?.remove();
        this.pageController = factory();
        this.container.innerHTML = "";
        this.container.append(this.pageController.component.element);
        this.currentPage = page;
    }
}
