import { HeaderComponent } from "../view/components/header/HeaderComponent";
import { BaseController } from "./BaseController";

export class HeaderController extends BaseController<HeaderComponent> {
    public component: HeaderComponent;

    constructor() {
        super();
        this.component = new HeaderComponent(this);
    }
}
