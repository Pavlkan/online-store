export abstract class BaseComponent<T> {
    public element: HTMLElement;
    private props: T;

    constructor(className: string, props: T, tag: string = "div") {
        this.element = document.createElement(tag);
        this.element.classList.add(className);
        this.props = props;
        this.render();
        this.addListeners();
    }

    public beforeRemove() {
        // override in inheritors if needed
    }

    protected render(): void {}
    protected addListeners(): void {}
}
