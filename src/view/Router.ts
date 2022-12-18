import { BaseController } from "../controller/BaseController";
import { CatalogPageController } from "../controller/pages/CatalogPageController";
import { OnlineStore } from "../model/OnlineStore";

export class Router {
    private onlineStore: OnlineStore;
    private pageMap: Map<string, () => BaseController>;
    private container: HTMLElement;
    private currentPage?: string;
    private pageController?: BaseController;

    constructor(container: HTMLElement, onlineStore: OnlineStore) {
        this.container = container;
        this.onlineStore = onlineStore;
        this.pageMap = new Map([["catalog", () => new CatalogPageController(this.onlineStore)]]);

        const currentPage: string = this.getCurrentPage();
        this.navigateTo(currentPage);
    }

    public navigateTo(page: string) {
        if (!this.pageMap.has(page)) page = "catalog";
        const factory = this.pageMap.get(page);
        if (!factory || this.currentPage === page) return;

        this.pageController?.remove();
        this.pageController = factory();
        this.container.innerHTML = "";
        this.container.append(this.pageController.component.element);
        this.currentPage = page;

        this.updateUrl(page);
    }

    public getSegments(): string[] {
        return document.location.pathname.split("/").filter(Boolean);
    }

    private updateUrl(url: string): void {
        window.history.pushState(null, "", url);
    }

    private getCurrentPage(): string {
        const segments: string[] = this.getSegments();
        return segments[0] ?? "";
    }
}
