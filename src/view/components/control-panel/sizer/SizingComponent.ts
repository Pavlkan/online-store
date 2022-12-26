import { SizerController } from "../../../../controller/SizerController";
import { BaseComponent } from "../../../BaseComponent";

interface SizerComponentProps {
    controller: SizerController;
}

export class SizerComponent extends BaseComponent<SizerComponentProps> {
    constructor(controller: SizerController) {
        super("control-panel__size-options", { controller });
    }

    render() {
        const smallSize = document.createElement("button");
        const bigSize = document.createElement("button");
        smallSize.innerText = "small";
        bigSize.innerText = "big";
        smallSize.id = "small";
        bigSize.id = "big";
        this.element.append(smallSize, bigSize);
    }

    protected addListeners(): void {
        this.element.addEventListener("click", (event) => {
            if (event.target instanceof HTMLElement && event.target.id) {
                this.changeProductCardsSize(event.target.id);
            }
        });
    }

    private changeProductCardsSize(size: string): void {
        const cards = document.querySelectorAll(".product-card");
        cards.forEach((product: Element): void => {
            if (product.classList.contains(size)) return;
            product.classList.remove("small", "big");
            product.classList.add(size);
        });
    }
}
