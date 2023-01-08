import { Sizer } from '../model/Sizer';
import { SizerComponent } from '../view/components/control-panel/sizer/SizingComponent';
import { BaseController } from './BaseController';

export class SizerController extends BaseController<SizerComponent> {
    public component: SizerComponent;
    private sizer: Sizer;

    constructor(sizer: Sizer) {
        super();
        this.sizer = sizer;
        this.component = new SizerComponent(this, this.sizer);
    }

    public remove(): void {
        this.component.beforeRemove();
    }

    public sizing(size: string) {
        this.sizer.touch();
        this.sizer.notify(size, false);
    }
}
