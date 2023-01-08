import { Observable } from './Observable';

export class Sizer extends Observable<string> {
    private touched = false;

    constructor() {
        super('');
    }

    public isTouched(): boolean {
        return this.touched;
    }

    public touch(): void {
        this.touched = true;
    }

    public reset() {
        this.touched = false;
        this.notify('big', false);
    }

    public sizing(cards: HTMLElement[]): void {
        const size = this.getData();
        cards.forEach((product: Element): void => {
            if (product.classList.contains(size)) return;
            product.classList.remove('small', 'big');
            product.classList.add(size);
        });
    }
}
