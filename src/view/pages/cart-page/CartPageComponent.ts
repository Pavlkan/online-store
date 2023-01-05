import { BaseComponent } from "../../BaseComponent";
import { CartComponent } from "../../components/cart/CartComponent";
import { CartPageController } from "../../../controller/pages/CartPageController";

interface CartPageProps {
    controller: CartPageController;
    cartComponent: CartComponent;
}

export class CartPageComponent extends BaseComponent<CartPageProps> {
    private cartPageContainer!: HTMLDivElement;
    public productInCartContainer!: HTMLDivElement;
    private buyButton!: HTMLButtonElement;
    private cartPagePromoLabel!: HTMLLabelElement;
    private cartPagePromoInput!: HTMLInputElement;
    private ProductsPerPageInput!: HTMLInputElement;
    private pageNumBtnPrev!: HTMLButtonElement;
    private pageNumBtnNext!: HTMLButtonElement;
    constructor(controller: CartPageController, cartComponent: CartComponent) {
        super("cart-section", { controller, cartComponent }, "section");
    }

    render() {
        this.cartPageContainer = document.createElement("div");
        this.cartPageContainer.className = "cart-page-container outer-container";

        this.productInCartContainer = document.createElement("div");
        this.productInCartContainer.className = "products-in-cart-container inner-container";

        const productInCartTitle = document.createElement("div");
        productInCartTitle.className = "products-in-cart__title title";
        productInCartTitle.innerText = "Products in Cart";

        const productInCartPageControl = document.createElement("div");
        productInCartPageControl.className = "page-control";

        const pageControlProductsPerPage = document.createElement("div");
        pageControlProductsPerPage.className = "page-control-items";
        pageControlProductsPerPage.innerText = "Items: ";
        this.ProductsPerPageInput = document.createElement("input");
        this.ProductsPerPageInput.className = "page-control-items__input";
        this.ProductsPerPageInput.id = "page-control-items__input-id";
        this.ProductsPerPageInput.type = "text";
        this.ProductsPerPageInput.value = "3";
        pageControlProductsPerPage.append(this.ProductsPerPageInput);

        const pageControlPageNum = document.createElement("div");
        pageControlPageNum.className = "page-control-page-num";
        pageControlPageNum.innerText = "Page: ";
        this.pageNumBtnPrev = document.createElement("button");
        this.pageNumBtnPrev.className = "page-control-page-num__btn-prev";
        this.pageNumBtnPrev.innerText = "<";
        const pageNumber = document.createElement("span");
        pageNumber.className = "page-num";
        pageNumber.innerText = `${1}`; //TODO add logic of switch page number
        this.pageNumBtnNext = document.createElement("button");
        this.pageNumBtnNext.className = "page-control-page-num__btn-next";
        this.pageNumBtnNext.innerText = ">";

        pageControlPageNum.append(this.pageNumBtnPrev, pageNumber, this.pageNumBtnNext);

        productInCartPageControl.append(pageControlProductsPerPage, pageControlPageNum);

        productInCartTitle.append(productInCartPageControl);

        const summaryContainer = document.createElement("div");
        summaryContainer.className = "summary-container inner-container";

        const title = document.createElement("h4");
        title.className = "cart-page__title title";
        title.innerText = "Summary";

        const cartPageTotalQuantity = document.createElement("p");
        cartPageTotalQuantity.className = "cart-page__total-quantity";
        cartPageTotalQuantity.innerText = "Products: 0";

        const cartPageTotalSum = document.createElement("p");
        cartPageTotalSum.className = "cart-page__total-sum";
        cartPageTotalSum.innerText = "Total: $ 0";

        this.cartPagePromoLabel = document.createElement("label");
        this.cartPagePromoLabel.className = "cart-page__promo-label";
        this.cartPagePromoLabel.htmlFor = "cart-page__promo-input-id";

        this.cartPagePromoInput = document.createElement("input");
        this.cartPagePromoInput.className = "cart-page__promo-input";
        this.cartPagePromoInput.id = "cart-page__promo-input-id";
        this.cartPagePromoInput.type = "search";
        this.cartPagePromoInput.placeholder = "Enter promo code";
        this.cartPagePromoLabel.append(this.cartPagePromoInput);

        const cartPagePromoTest = document.createElement("p");
        cartPagePromoTest.className = "cart-page__promo-test";
        cartPagePromoTest.innerText = "Promo for test 'RS', 'HNY'";

        this.buyButton = document.createElement("button");
        this.buyButton.className = "cart-page__buy-btn button";
        this.buyButton.innerText = "BUY NOW";

        summaryContainer.append(
            title,
            cartPageTotalQuantity,
            cartPageTotalSum,
            this.cartPagePromoLabel,
            cartPagePromoTest,
            this.buyButton
        );

        this.productInCartContainer.append(productInCartTitle);
        this.cartPageContainer.append(this.productInCartContainer, summaryContainer);
        this.element.append(this.cartPageContainer);

        this.element.append(this.props.cartComponent.element);

        console.log("cart", localStorage.getItem("cart"));
    }

    addListeners() {
        this.element.addEventListener("click", (event): void => {
            if (event.target instanceof HTMLElement) {
                if (event.target === this.buyButton) {
                    console.log("cart-buyButton");
                }
            }
        });
    }
}
