import { CategoryFilterController } from '../../../../controller/filters/CategoryFilterController';
import { Assortment } from '../../../../model/Assortment';
import { CategoryFilter, CategoryFilterData } from '../../../../model/filters/CategoryFilter';
import { Product } from '../../../../model/Product';
import { Selection } from '../../../../model/Selection';
import { BaseComponent } from '../../../BaseComponent';
import './category-filter.css';

interface CategoryFilterComponentProps {
    controller: CategoryFilterController;
    categoryFilter: CategoryFilter;
    assortment: Assortment;
    selection: Selection;
}

export class CategoryFilterComponent extends BaseComponent<CategoryFilterComponentProps> {
    private categoryFilterSubscriptionId!: number;
    private selectionSubscriptionId!: number;

    constructor(
        controller: CategoryFilterController,
        categoryFilter: CategoryFilter,
        assortment: Assortment,
        selection: Selection
    ) {
        super('filters__category', { controller, categoryFilter, assortment, selection });
    }

    public beforeRemove(): void {
        this.props.categoryFilter.unsubscribe(this.categoryFilterSubscriptionId);
    }

    protected render() {
        this.createInputElements();
        
        this.categoryFilterSubscriptionId = this.props.categoryFilter.subscribe((filter: CategoryFilterData) => {
            filter.forEach((selected, category) => {
                const inputArr = Array.from(this.element.querySelectorAll('input'));
                const input = inputArr.find((element) => element.value === category);
                if (input) input.checked = selected;
            });
        });

        this.selectionSubscriptionId = this.props.selection.subscribe((products: Product[]) => {
            const categories = this.props.assortment.getCategories();
            this.props.categoryFilter.getData().forEach((_, category) => {
                const all = categories.get(category)?.length ?? 0;
                const selected = products.filter((product: Product) => product.category === category).length;
                const presence = `${selected}/${all}`;

                this.updatePresenceElement(category, presence);
                this.updatePresenceContainer(category, selected);
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

    private updatePresenceElement(category: string, presence: string): void {
        const element = this.element.querySelector(`.filters__category-presence[data-category="${category}"]`);
        if (element) (element as HTMLElement).innerText = presence;
    }

    private updatePresenceContainer(category: string, selected: number): void {
        const element = this.element.querySelector(`.filters__category-container[data-category="${category}"]`);
        if (element) {
            selected ? element.classList.remove('empty') : element.classList.add('empty');
        }
    }

    private createInputElements(): void {
        const filter = this.props.categoryFilter.getData();
        filter.forEach((selected, category) => {
            const categoryContainer = document.createElement('div');
            const categoryPresence = document.createElement('div');

            categoryContainer.classList.add('filters__category-container');
            categoryContainer.setAttribute('data-category', category);
            categoryPresence.classList.add('filters__category-presence');
            categoryPresence.setAttribute('data-category', category);

            const categoryInput = document.createElement('input');
            const categoryLabel = document.createElement('label');
            categoryInput.classList.add('filters__checkbox');
            categoryLabel.classList.add('filters__label');
            categoryInput.type = 'checkbox';
            categoryInput.value = category;
            categoryInput.checked = selected;
            categoryLabel.innerText = category;
            categoryLabel.append(categoryInput);

            categoryContainer.append(categoryLabel, categoryPresence);
            this.element.append(categoryContainer);
        });
    }
}
