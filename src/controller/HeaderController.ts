import { OnlineStore } from '../model/OnlineStore';
import { HeaderComponent } from '../view/components/header/HeaderComponent';
import { BaseController } from './BaseController';

export class HeaderController extends BaseController<HeaderComponent> {
    public component: HeaderComponent;

    constructor(onlineStore: OnlineStore) {
        super();
        this.component = new HeaderComponent(this, onlineStore.getCart());
    }

    public remove(): void {
        this.component.beforeRemove();
    }
}
