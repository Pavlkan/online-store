import { CartCatalogController } from '../../../controller/cart/CartCatalogController';
import { Cart } from '../../../model/Cart';
import { BaseComponent } from '../../BaseComponent';
import { CartControlPanelComponent } from './control-panel/CartControlPanelComponent';

interface CartCatalogComponentProps {
    controller: CartCatalogController;
    cart: Cart;
}

export class CartCatalogComponent extends BaseComponent<CartCatalogComponentProps> {
    private controlPanel!: CartControlPanelComponent;

    constructor(controller: CartCatalogController, cart: Cart) {
        super('cart-page__catalog', { controller, cart });
    }

    public beforeRemove(): void {
        this.controlPanel.beforeRemove();
    }

    protected render(): void {
        this.controlPanel = new CartControlPanelComponent(this.onControlPanelChange.bind(this));

        this.element.append(this.controlPanel.element);
    }

    private onControlPanelChange(limitNumber: number, pageNumber: number): void {
        //
    }
}
