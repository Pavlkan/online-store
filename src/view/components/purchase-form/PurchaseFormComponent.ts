import { BaseComponent } from '../../BaseComponent';
import { Modal } from '../../modal/Modal';
import { Router } from '../../Router';
import './purchase-form.css';

interface PurchaseFormComponentProps {
    router: Router;
    modal: Modal;
}

export class PurchaseFormComponent extends BaseComponent<PurchaseFormComponentProps> {
    constructor(router: Router, modal: Modal) {
        super('purchase-form', { router, modal });
    }

    protected render(): void {
        // 
    }
}
