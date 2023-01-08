import { UnknownPageComponent } from '../../view/pages/unknown-page/UnknownPageComponent';
import { Router } from '../../view/Router';
import { BaseController } from '../BaseController';

export class UnknownPageController extends BaseController<UnknownPageComponent> {
    public component: UnknownPageComponent;

    constructor(router: Router) {
        super();
        this.component = new UnknownPageComponent(this, router);
    }

    public remove(): void {
        this.component.beforeRemove();
    }
}
