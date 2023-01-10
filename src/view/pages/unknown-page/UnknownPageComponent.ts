import { UnknownPageController } from '../../../controller/pages/UnknownPageController';
import { BaseComponent } from '../../BaseComponent';
import { Router } from '../../Router';
import './unknown-page.css';

interface UnknownPageComponentProps {
    controller: UnknownPageController;
    router: Router;
}

export class UnknownPageComponent extends BaseComponent<UnknownPageComponentProps> {
    private navigateButton!: HTMLButtonElement;

    constructor(controller: UnknownPageController, router: Router) {
        super('unknown-page', { controller, router });
    }

    protected render(): void {
        const wrapper = document.createElement('div');
        this.navigateButton = document.createElement('button');

        wrapper.classList.add('unknown-page__wrapper');
        this.navigateButton.classList.add('unknown-page__button');
        this.navigateButton.innerText = 'Return to catalog';

        this.element.innerText = '404';
        wrapper.append(this.navigateButton);
        this.element.append(wrapper);
    }

    protected addListeners(): void {
        this.navigateButton.addEventListener('click', () => {
            this.props.router.navigateTo('catalog');
        });
    }
}
