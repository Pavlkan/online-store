import { OnlineStore } from '../../model/OnlineStore';
import { CatalogPageComponent } from '../../view/pages/catalog-page/CatalogPageComponent';
import { Router } from '../../view/Router';
import { BaseController } from '../BaseController';
import { CatalogController } from '../CatalogController';
import { ControlPanelController } from '../ControlPanelController';
import { FiltersPanelController } from '../filters/FiltersPanelController';

export class CatalogPageController extends BaseController<CatalogPageComponent> {
    public component: CatalogPageComponent;
    public onlineStore: OnlineStore;
    public router: Router;
    public filtersPanel: FiltersPanelController;
    public catalog: CatalogController;
    public controlPanel: ControlPanelController;

    constructor(onlineStore: OnlineStore, router: Router) {
        super();
        this.onlineStore = onlineStore;
        this.router = router;
        this.controlPanel = new ControlPanelController(this.onlineStore);
        this.filtersPanel = new FiltersPanelController(
            onlineStore.getCategoryFilter(),
            onlineStore.getBrandFilter(),
            onlineStore.getPriceFilter(),
            onlineStore.getStockFilter(),
            onlineStore,
            router
        );
        this.catalog = new CatalogController(onlineStore, this.router);
        this.component = new CatalogPageComponent(
            this,
            this.filtersPanel.component,
            this.controlPanel.component,
            this.catalog.component
        );
    }

    public remove(): void {
        this.controlPanel.remove();
        this.filtersPanel.remove();
    }
}
