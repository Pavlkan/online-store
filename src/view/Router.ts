import { BaseController } from "../controller/BaseController";
import { CartPageController } from '../controller/pages/CartPageController';
import { CatalogPageController } from "../controller/pages/CatalogPageController";
import { ProductPageController } from "../controller/pages/ProductPageController";
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
        this.pageMap = new Map<string, () => BaseController>([
            ["catalog", () => new CatalogPageController(this.onlineStore, this)],
            ["product", () => new ProductPageController(this.onlineStore, this)],
            ["cart", () => new CartPageController(this.onlineStore, this)],
        ]);

        const currentPage: string = this.getCurrentPage();
        this.navigateTo(currentPage);
        this.onNavigation();
    }

    public navigateTo(page: string) {
        if (this.currentPage === page) return;
        const factory = this.getControllerFactory(page);

        this.updateUrl(page);
        this.pageController?.remove();
        this.pageController = factory();
        this.container.innerHTML = "";
        this.container.append(this.pageController.component.element);
        this.currentPage = page;
    }

    public getSegments(): string[] {
        return document.location.pathname.split("/").filter(Boolean);
    }

    private updateUrl(url: string): void {
        let pageInUrl = false;
        for (const declaredPage of this.pageMap.keys()) {
            if (url.includes(declaredPage)) pageInUrl = true;
        }
        if (!pageInUrl) {
            url = "catalog";
        }
        if (url !== this.getCurrentPage()) window.history.pushState(null, "", url);
    }

    private getCurrentPage(): string {
        const segments: string[] = this.getSegments();
        return segments.join("/");
    }

    private getControllerFactory(page: string): () => BaseController {
        let pageToFind = "";
        for (const declaredPage of this.pageMap.keys()) {
            if (page.includes(declaredPage)) pageToFind = declaredPage;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.pageMap.get(pageToFind || "catalog")!;
    }

    private onNavigation(): void {
        window.addEventListener("popstate", () => {
            const currentPage: string = this.getCurrentPage();
            this.navigateTo(currentPage);
        });
    }
}
