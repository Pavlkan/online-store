import { CategoryFilterController } from '../../../../controller/filters/CategoryFilterController';
import { CategoryFilter, CategoryFilterData } from '../../../../model/CategoryFilter';
import { BaseComponent } from '../../../BaseComponent';
import './category-filter.css';

interface CategoryFilterComponentProps {
    controller: CategoryFilterController;
    categoryFilter: CategoryFilter;
}

export class CategoryFilterComponent extends BaseComponent<CategoryFilterComponentProps> {
    private categoryFilterSubscriptionId!: number;

    constructor(controller: CategoryFilterController, categoryFilter: CategoryFilter) {
        super('filters__category', { controller, categoryFilter });
    }

    public beforeRemove(): void {
        this.props.categoryFilter.unsubscribe(this.categoryFilterSubscriptionId);
    }

    protected render() {
        this.createInputElements();
        // TODO Split creation and updating
        this.categoryFilterSubscriptionId = this.props.categoryFilter.subscribe((filter: CategoryFilterData) => {
            filter.forEach((selected, category) => {
                const inputArr = Array.from(this.element.querySelectorAll('input'));
                const input = inputArr.find((element) => element.value === category);
                input!.checked = selected;
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
        const filter = this.props.categoryFilter.getData();
        filter.forEach((selected, category) => {
            const categoryInput = document.createElement('input');
            const categoryLabel = document.createElement('label');
            categoryInput.classList.add('filters__checkbox');
            categoryLabel.classList.add('filters__label');
            categoryInput.type = 'checkbox';
            categoryInput.value = category;
            categoryInput.checked = selected;
            categoryLabel.innerText = category;
            categoryLabel.append(categoryInput);
            this.element.append(categoryLabel);
        });
    }
}
