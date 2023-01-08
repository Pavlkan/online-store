import { SizerController } from '../../../../controller/SizerController';
import { Sizer } from '../../../../model/Sizer';
import { BaseComponent } from '../../../BaseComponent';
import './sizing-component.css';

interface SizerComponentProps {
    controller: SizerController;
    sizer: Sizer;
}

export class SizerComponent extends BaseComponent<SizerComponentProps> {
    private sizerSubscriptionId!: number;

    constructor(controller: SizerController, sizer: Sizer) {
        super('control-panel__size-options', { controller, sizer });
    }

    public beforeRemove(): void {
        this.props.sizer.unsubscribe(this.sizerSubscriptionId);
    }

    render() {
        const smallSize = document.createElement('button');
        const bigSize = document.createElement('button');
        smallSize.innerText = 'small';
        bigSize.innerText = 'big';
        smallSize.id = 'small';
        bigSize.id = 'big';
        this.element.append(smallSize, bigSize);

        this.sizerSubscriptionId = this.props.sizer.subscribe((size: string) => {
            if (size === 'small') {
                bigSize.classList.remove('_active');
                smallSize.classList.add('_active');
            } else {
                smallSize.classList.remove('_active');
                bigSize.classList.add('_active');
            }
        });
    }

    protected addListeners(): void {
        this.element.addEventListener('click', (event) => {
            if (event.target instanceof HTMLButtonElement && event.target.id) {
                this.props.controller.sizing(event.target.id);
            }
        });
    }
}
