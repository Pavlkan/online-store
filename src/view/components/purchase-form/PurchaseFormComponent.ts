import { CartSummaryController } from '../../../controller/cart/CartSummaryController';
import { BaseComponent } from '../../BaseComponent';
import { Modal } from '../../modal/Modal';
import { Router } from '../../Router';
import './purchase-form.css';

interface PurchaseFormComponentProps {
    controller: CartSummaryController;
    router: Router;
    modal: Modal;
}

export class PurchaseFormComponent extends BaseComponent<PurchaseFormComponentProps> {
    private personNameInput!: HTMLInputElement;
    private personPhoneInput!: HTMLInputElement;
    private personAddressInput!: HTMLInputElement;
    private personMailInput!: HTMLInputElement;
    private cardNumberInput!: HTMLInputElement;
    private validThruInput!: HTMLInputElement;
    private cvvInput!: HTMLInputElement;
    private errorAlarm!: HTMLElement;
    private confirmButton!: HTMLButtonElement;

    constructor(controller: CartSummaryController, router: Router, modal: Modal) {
        super('purchase-form', { controller, router, modal });
    }

    protected render(): void {
        this.createPersonInfoSection();
        this.createCardInfoSection();
    }

    private createPersonInfoSection(): void {
        const personInfoContainer = document.createElement('div');
        const personInfoTitle = document.createElement('h3');
        this.personNameInput = document.createElement('input');
        this.personPhoneInput = document.createElement('input');
        this.personAddressInput = document.createElement('input');
        this.personMailInput = document.createElement('input');

        personInfoContainer.classList.add('purchase-form__person-info-container');
        personInfoTitle.classList.add('purchase-form__person-info-title');
        this.personNameInput.classList.add('purchase-form__person-name');
        this.personPhoneInput.classList.add('purchase-form__person-phone');
        this.personAddressInput.classList.add('purchase-form__person-address');
        this.personMailInput.classList.add('purchase-form__person-mail');

        personInfoTitle.innerText = 'Personal details';
        this.personNameInput.placeholder = 'Name';
        this.personPhoneInput.placeholder = 'Phone number +375 XX X** ** **';
        this.personAddressInput.placeholder = 'Delivery address';
        this.personMailInput.placeholder = 'E-mail';

        this.personNameInput.required = true;
        this.personPhoneInput.required = true;
        this.personAddressInput.required = true;
        this.personMailInput.required = true;

        this.personNameInput.type = 'text';
        this.personPhoneInput.type = 'tel';
        this.personAddressInput.type = 'text';
        this.personMailInput.type = 'email';

        personInfoContainer.append(
            personInfoTitle,
            this.personNameInput,
            this.personPhoneInput,
            this.personAddressInput,
            this.personMailInput
        );

        this.element.append(personInfoContainer);
    }

    private createCardInfoSection(): void {
        const cardInfoContainer = document.createElement('div');
        const cardInfoTitle = document.createElement('h3');
        this.cardNumberInput = document.createElement('input');
        const thruCvvContainer = document.createElement('div');
        const validThruContainer = document.createElement('div');
        const validThruForm = document.createElement('form');
        this.validThruInput = document.createElement('input');
        const cvvContainer = document.createElement('div');
        const cvvForm = document.createElement('form');
        this.cvvInput = document.createElement('input');
        this.confirmButton = document.createElement('button');

        cardInfoContainer.classList.add('purchase-form__card-info-container');
        cardInfoTitle.classList.add('purchase-form__card-info-title');
        this.cardNumberInput.classList.add('purchase-form__card-number');
        thruCvvContainer.classList.add('purchase-form__card-thru-cvv-container');
        validThruContainer.classList.add('purchase-form__card-THRU-container');
        validThruForm.classList.add('purchase-form__card-THRU-form');
        this.validThruInput.classList.add('purchase-form__card-THRU');
        cvvContainer.classList.add('purchase-form__card-CVV-container');
        cvvForm.classList.add('purchase-form__card-CVV-form');
        this.cvvInput.classList.add('purchase-form__card-CVV');
        this.confirmButton.classList.add('purchase-form__confirm-button');

        this.personNameInput.id = 'untouched';
        this.personPhoneInput.id = 'untouched';
        this.personAddressInput.id = 'untouched';
        this.personMailInput.id = 'untouched';
        this.cardNumberInput.id = 'untouched';
        this.validThruInput.id = 'untouched';
        this.cvvInput.id = 'untouched';

        this.personNameInput.name = 'Name';
        this.personPhoneInput.name = 'Phone';
        this.personAddressInput.name = 'Address';
        this.personMailInput.name = 'Mail';
        this.cardNumberInput.name = 'Card number';
        this.validThruInput.name = 'THRU';
        this.cvvInput.name = 'CVV';

        this.errorAlarm = document.createElement('p');
        this.errorAlarm.classList.add('purchase-form__error-alarm');

        cardInfoTitle.innerText = 'Credit card details';
        this.cardNumberInput.placeholder = 'Card number';
        validThruForm.value = 'VALID:';
        this.validThruInput.placeholder = 'Valid THRU';
        cvvForm.value = 'CVV:';
        this.cvvInput.placeholder = 'Code';
        this.confirmButton.innerText = 'CONFIRM';

        this.cardNumberInput.required = true;
        this.cardNumberInput.maxLength = 12;
        this.validThruInput.required = true;
        this.validThruInput.maxLength = 4;
        this.cvvInput.required = true;
        this.cvvInput.maxLength = 3;

        this.cardNumberInput.type = 'text';
        this.validThruInput.type = 'text';
        this.cvvInput.type = 'text';

        validThruContainer.append(validThruForm, this.validThruInput);
        cvvContainer.append(cvvForm, this.cvvInput);
        thruCvvContainer.append(validThruContainer, cvvContainer);
        cardInfoContainer.append(
            cardInfoTitle,
            this.cardNumberInput,
            thruCvvContainer,
            this.errorAlarm,
            this.confirmButton
        );

        this.element.append(cardInfoContainer);
    }

    protected addListeners(): void {
        const inputs = [
            this.personNameInput,
            this.personPhoneInput,
            this.personAddressInput,
            this.personMailInput,
            this.cardNumberInput,
            this.validThruInput,
            this.cvvInput,
        ];
        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                input.id = 'touched';
                if (this.validation(input)) {
                    input.classList.add('valid');
                } else {
                    input.classList.remove('valid');
                }
            });
            input.addEventListener('blur', () => {
                input.classList.add('blur');
            });
            input.addEventListener('focus', () => {
                input.classList.remove('blur');
            });
        });

        this.confirmButton.addEventListener('click', () => {
            this.errorAlarm.innerHTML = '';
            const untouchedInputs = inputs.filter((input) => input.id === 'untouched').map((input) => input.name);
            const invalidsInputs = Array.from(this.element.querySelectorAll('.invalid'));
            const invalidsInputsName = invalidsInputs.map((input) => (input as HTMLInputElement).name);
            if (untouchedInputs.length >= 1) {
                this.errorAlarm.innerText = `
                Unfilled fields: ${untouchedInputs.join(', ')}
                `;
            }
            if (invalidsInputsName.length >= 1) {
                this.errorAlarm.innerText += `
                Validation error: ${invalidsInputsName.join(', ')}
                `;
                return;
            }
            if (untouchedInputs.length === 0 && invalidsInputsName.length === 0) {
                this.element.innerHTML = '';
                this.element.innerText = 'Thank you for purchase!';
                this.element.classList.add('final');
                setTimeout(() => {
                    this.props.controller.clearCart();
                    this.props.modal.detach();
                    this.props.router.navigateTo('catalog');
                }, 3000);
            }
        });
    }

    private validation(input: HTMLInputElement): boolean {
        input.classList.remove('valid');
        input.classList.remove('invalid');
        if (input === this.personNameInput && this.isValidText(input.value)) return true;
        if (input === this.personPhoneInput && this.isValidPhone(input.value)) return true;
        if (input === this.personAddressInput && this.isValidAddress(input.value)) return true;
        if (input === this.personMailInput && this.isMailValid(input.value)) return true;
        if (input === this.cardNumberInput && this.isValidCardNumber(input.value)) return true;
        if (input === this.validThruInput && this.isValidTHRU(input.value)) return true;
        if (input === this.cvvInput && this.isValidCVV(input.value)) return true;
        input.classList.add('invalid');
        return false;
    }

    private isValidText(name: string): boolean {
        if (name.length < 2) return false;
        const eng = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const rus = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        return name.split('').every((letter) => {
            const upLetter = letter.toUpperCase();
            return eng.includes(upLetter) || rus.includes(upLetter);
        });
    }

    private isValidPhone(phone: string): boolean {
        const phoneTrimmed = phone.split(' ').join('');
        if (phoneTrimmed.length !== 13 || phoneTrimmed.slice(0, 4) !== '+375') return false;
        return this.isValidNumbers(phoneTrimmed.slice(1));
    }

    private isValidNumbers(numberStr: string): boolean {
        return numberStr.split('').every((number) => Number(number) >= 0);
    }

    private isValidAddress(address: string): boolean {
        if (address.length === 0) return false;
        const eng = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const rus = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        const unwantedSymbols = '~`!@$%^*_+={}[]|;:';
        const freeFromSymbols = address.split('').every((symbol) => !unwantedSymbols.includes(symbol));
        const hasLetters = address.split('').some((symbol) => {
            return eng.includes(symbol.toUpperCase()) || rus.includes(symbol.toUpperCase());
        });
        return freeFromSymbols && hasLetters;
    }

    private isMailValid(mail: string): boolean {
        if (!mail.includes('@')) return false;
        const atSignIndex = mail.indexOf('@');
        return mail.slice(atSignIndex).length > 2 && mail.slice(0, atSignIndex).length > 2;
    }

    private isValidTHRU(numberStr: string) {
        if (numberStr.length !== 4) return false;
        return this.isValidNumbers(numberStr);
    }

    private isValidCVV(numberStr: string) {
        if (numberStr.length !== 3) return false;
        return this.isValidNumbers(numberStr);
    }

    private isValidCardNumber(creditCardNumber: string): boolean {
        if (creditCardNumber.toString().length !== 16) return false;
        const transformArr = creditCardNumber
            .split('')
            .reverse()
            .map((number, index) => {
                if ((index + 1) % 2 !== 0) return +number;
                const transformedNum = +number * 2;
                if (transformedNum > 9) {
                    const numberStr = transformedNum.toString();
                    const firstNum = numberStr[0];
                    const secondNum = numberStr[1];
                    return +firstNum + +secondNum;
                }
                return +transformedNum;
            });
        return transformArr.reduce((acc, number) => acc + number, 0) % 10 === 0;
    }
}
