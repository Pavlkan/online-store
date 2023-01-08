import { BrandFilterController } from '../../../../controller/filters/BrandFilterController';
import { Assortment } from '../../../../model/Assortment';
import { BrandFilter, BrandFilterData } from '../../../../model/filters/BrandFilter';
import { Product } from '../../../../model/Product';
import { Selection } from '../../../../model/Selection';
import { BaseComponent } from '../../../BaseComponent';
import './brand-filter.css';

interface BrandFilterComponentProps {
    controller: BrandFilterController;
    brandFilter: BrandFilter;
    assortment: Assortment;
    select: Selection;
}

export class BrandFilterComponent extends BaseComponent<BrandFilterComponentProps> {
    private brandFilterSubscriptionId!: number;
    private selectionSubscriptionId!: number;

    constructor(
        controller: BrandFilterController,
        brandFilter: BrandFilter,
        assortment: Assortment,
        select: Selection
    ) {
        super('filters__brand', { controller, brandFilter, assortment, select });
    }

    public beforeRemove(): void {
        this.props.brandFilter.unsubscribe(this.brandFilterSubscriptionId);
        this.props.select.unsubscribe(this.selectionSubscriptionId);
    }

    protected render() {
        this.createInputElements();

        this.brandFilterSubscriptionId = this.props.brandFilter.subscribe((filter: BrandFilterData) => {
            filter.forEach((selected, brand) => {
                const inputArr = Array.from(this.element.querySelectorAll('input'));
                const input = inputArr.find((element) => element.value === brand);
                if (input) input.checked = selected;
            });
        });

        this.selectionSubscriptionId = this.props.select.subscribe((products: Product[]) => {
            const brands = this.props.assortment.getBrands();
            this.props.brandFilter.getData().forEach((_, brand) => {
                const all = brands.get(brand)?.length ?? 0;
                const selected = products.filter((product: Product) => product.brand === brand).length;
                const presence = `${selected}/${all}`;

                this.updatePresenceElement(brand, presence);
                this.updatePresenceContainer(brand, selected);
            });
        });
    }

    protected addListeners(): void {
        this.element.addEventListener('change', (event) => {
            if (event.target instanceof HTMLInputElement) {
                this.props.controller.filter(event.target.value, event.target.checked);
            }
        });
    }

    private updatePresenceElement(brand: string, presence: string): void {
        const element = this.element.querySelector(`.filters__brand-presence[data-brand="${brand}"]`);
        if (element) (element as HTMLElement).innerText = presence;
    }

    private updatePresenceContainer(brand: string, selected: number): void {
        const element = this.element.querySelector(`.filters__brand-container[data-brand="${brand}"]`);
        if (element) {
            selected ? element.classList.remove('empty') : element.classList.add('empty');
        }
    }

    private createInputElements(): void {
        const filter = this.props.brandFilter.getData();
        filter.forEach((selected, brand) => {
            const brandContainer = document.createElement('div');
            const brandPresence = document.createElement('div');

            brandContainer.classList.add('filters__brand-container');
            brandContainer.setAttribute('data-brand', brand);
            brandPresence.classList.add('filters__brand-presence');
            brandPresence.setAttribute('data-brand', brand);

            const brandInput = document.createElement('input');
            const brandLabel = document.createElement('label');
            brandInput.classList.add('filters__checkbox');
            brandLabel.classList.add('filters__label');
            brandInput.type = 'checkbox';
            brandInput.value = brand;
            brandInput.checked = selected;
            brandLabel.innerText = brand;
            brandLabel.append(brandInput);

            brandContainer.append(brandLabel, brandPresence);
            this.element.append(brandContainer);
        });
    }
}
