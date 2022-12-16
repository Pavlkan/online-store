import { BaseController } from "../controller/BaseController";
import { HeaderController } from "../controller/HeaderController";

export class Router {
    private onlineShop: unknown;
    private pageMap: Map<string, () => BaseController>;
    private container: HTMLElement;
    private currentPage?: string;
    private pageController?: BaseController;

    constructor(container: HTMLElement, onlineShop: unknown) {
        this.container = container;
        this.onlineShop = onlineShop;
        this.pageMap = new Map([["catalogPage", () => new HeaderController()]]);
        // TODO change map to actual pages
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
