import { BrandFilterController } from '../../../../controller/filters/BrandFilterController';
import { BrandFilter, BrandFilterData } from '../../../../model/filters/BrandFilter';
import { BaseComponent } from '../../../BaseComponent';

interface BrandFilterComponentProps {
    controller: BrandFilterController;
    brandFilter: BrandFilter;
}

export class BrandFilterComponent extends BaseComponent<BrandFilterComponentProps> {
    private brandFilterSubscriptionId!: number;

    constructor(controller: BrandFilterController, brandFilter: BrandFilter) {
        super('filters__brand', { controller, brandFilter });
    }

    public beforeRemove(): void {
        this.props.brandFilter.unsubscribe(this.brandFilterSubscriptionId);
    }

    protected render() {
        const filterTitle = document.createElement('h3');
        filterTitle.className = 'filter__title_fixed title';
        filterTitle.innerText = 'Brand';

        const filterInputsContainer = document.createElement('div');
        filterInputsContainer.className = 'filter__inputs-container';

        this.element.append(filterTitle, filterInputsContainer);

        this.createInputElements();
        this.brandFilterSubscriptionId = this.props.brandFilter.subscribe((filter: BrandFilterData) => {
            filter.forEach((selected, brand) => {
                const inputArr = Array.from(this.element.querySelectorAll('input'));
                const input = inputArr.find((element) => element.value === brand);
                if (input) input.checked = selected;
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

    private createInputElements(): void {
        const filter = this.props.brandFilter.getData();
        filter.forEach((selected, brand) => {
            const brandInput = document.createElement('input');
            const brandLabel = document.createElement('label');
            brandInput.classList.add('filters__checkbox');
            brandLabel.classList.add('filters__label');
            brandInput.type = 'checkbox';
            brandInput.value = brand;
            brandInput.checked = selected;
            brandLabel.innerText = brand;
            brandLabel.append(brandInput);
            this.element.append(brandLabel);
        });
    }
}
