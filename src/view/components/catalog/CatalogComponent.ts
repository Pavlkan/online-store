import { CatalogController } from '../../../controller/CatalogController';
import { Cart } from '../../../model/Cart';
import { Product } from '../../../model/Product';
import { Selection } from '../../../model/Selection';
import { Sizer } from '../../../model/Sizer';
import { BaseComponent } from '../../BaseComponent';
import { Router } from '../../Router';
import { ProductCardComponent } from '../product-сard/ProductCardComponent';
import './catalog-component.css';

interface CatalogComponentProps {
    controller: CatalogController;
    selection: Selection;
    router: Router;
    cart: Cart;
    cardComponents: ProductCardComponent[];
    sizer: Sizer;
}

export class CatalogComponent extends BaseComponent<CatalogComponentProps> {
    private subscriptionSelectionId!: number;

    constructor(controller: CatalogController, selection: Selection, router: Router, cart: Cart, sizer: Sizer) {
        super('catalog', { controller, selection, router, cart, cardComponents: [], sizer });
    }

    public beforeRemove(): void {
        this.props.selection.unsubscribe(this.subscriptionSelectionId);
        this.removeCardsComponents();
    }

    protected render() {
        this.subscriptionSelectionId = this.props.selection.subscribe((products: Product[]): void => {
            this.renderCategoryComponents(products);
        });
    }

    private renderCategoryComponents(products: Product[]): void {
        this.removeCardsComponents();
        this.props.cardComponents = products.map(
            (product: Product) =>
                new ProductCardComponent(
                    this.props.controller,
                    product,
                    this.props.router,
                    this.props.cart,
                    this.props.sizer
                )
        );
        this.props.cardComponents.forEach((component: ProductCardComponent): void => {
            this.element.append(component.element);
        });
    }

    private removeCardsComponents(): void {
        this.props.cardComponents.forEach((component: ProductCardComponent) => component.beforeRemove());
        this.element.innerHTML = '';
    }
}
