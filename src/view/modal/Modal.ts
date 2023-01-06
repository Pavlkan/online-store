import './modal.css';

export class Modal {
    private overlay: HTMLElement | null = null;

    public attach(element: HTMLElement): void {
        if (this.overlay) return;
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');
        this.overlay.append(element);
        document.body.append(this.overlay);
    }

    public detach(): void {
        this.overlay?.remove();
        this.overlay = null;
    }
}
