import { OnlineStore } from '../model/OnlineStore';
import { HeaderComponent } from '../view/components/header/HeaderComponent';
import { Router } from '../view/Router';
import { BaseController } from './BaseController';

export class HeaderController extends BaseController<HeaderComponent> {
    public component: HeaderComponent;

    constructor(onlineStore: OnlineStore, router: Router) {
        super();
        this.component = new HeaderComponent(this, onlineStore.getCart(), router);
    }

    public remove(): void {
        this.component.beforeRemove();
    }
}
