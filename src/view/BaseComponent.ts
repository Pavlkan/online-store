export abstract class BaseComponent<T> {
    public element: HTMLElement;
    protected props: T;

    constructor(className: string, props: T, tag = "div") {
        this.element = document.createElement(tag);
        this.element.classList.add(className);
        this.props = props;
        this.render();
        this.addListeners();
    }

    protected beforeRemove() {
        // override in inheritors if needed
    }

    protected render(): void {
        // render in inheritors if needed
    }

    protected addListeners(): void {
        // addListeners in inheritors if needed
    }
}
