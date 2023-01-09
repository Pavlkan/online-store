import { Cart } from '../../../model/Cart';
import { BaseComponent } from '../../BaseComponent';
import { Modal } from '../../modal/Modal';
import { Router } from '../../Router';
import './purchase-form.css';

interface PurchaseFormComponentProps {
    cart: Cart;
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
    private cardNumberTitle!: HTMLElement;
    private cardNumberImg!: HTMLImageElement;
    private confirmButton!: HTMLButtonElement;

    constructor(cart: Cart, router: Router, modal: Modal) {
        super('purchase-form', { cart, router, modal });
    }

    protected render(): void {
        this.createPersonInfoSection();
        this.createCardInfoSection();
    }

    private createPersonInfoSection(): void {
        this.element.classList.add('inner-container');
        const personInfoContainer = document.createElement('div');
        const personInfoTitle = document.createElement('h3');

        const nameInputContainer = document.createElement('div');
        const phoneInputContainer = document.createElement('div');
        const addressInputContainer = document.createElement('div');
        const mailInputContainer = document.createElement('div');
        nameInputContainer.classList.add('input__container');
        phoneInputContainer.classList.add('input__container');
        addressInputContainer.classList.add('input__container');
        mailInputContainer.classList.add('input__container');

        const nameInputMessage = document.createElement('div');
        const phoneInputMessage = document.createElement('div');
        const addressInputMessage = document.createElement('div');
        const mailInputMessage = document.createElement('div');
        nameInputMessage.classList.add('input__message');
        phoneInputMessage.classList.add('input__message');
        addressInputMessage.classList.add('input__message');
        mailInputMessage.classList.add('input__message');

        this.personNameInput = document.createElement('input');
        this.personPhoneInput = document.createElement('input');
        this.personAddressInput = document.createElement('input');
        this.personMailInput = document.createElement('input');

        nameInputContainer.append(nameInputMessage, this.personNameInput);
        phoneInputContainer.append(phoneInputMessage, this.personPhoneInput);
        addressInputContainer.append(addressInputMessage, this.personAddressInput);
        mailInputContainer.append(mailInputMessage, this.personMailInput);

        personInfoContainer.classList.add('purchase-form__person-info-container');
        personInfoTitle.classList.add('purchase-form__person-info-title');
        this.personNameInput.classList.add('purchase-form__person-name');
        this.personPhoneInput.classList.add('purchase-form__person-phone');
        this.personAddressInput.classList.add('purchase-form__person-address');
        this.personMailInput.classList.add('purchase-form__person-mail');

        personInfoTitle.innerText = 'Personal details';
        this.personNameInput.placeholder = 'Name and Family name';
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
            nameInputContainer,
            phoneInputContainer,
            addressInputContainer,
            mailInputContainer
        );

        this.element.append(personInfoContainer);
    }

    private createCardInfoSection(): void {
        const cardInfoContainer = document.createElement('div');
        const cardInfoTitle = document.createElement('h3');
        this.cardNumberImg = document.createElement('img');
        this.cardNumberTitle = document.createElement('div');
        this.cardNumberInput = document.createElement('input');
        const thruCvvContainer = document.createElement('div');
        const validThruContainer = document.createElement('div');
        const validThruForm = document.createElement('form');
        this.validThruInput = document.createElement('input');
        const cvvContainer = document.createElement('div');
        const cvvForm = document.createElement('form');
        this.cvvInput = document.createElement('input');
        this.confirmButton = document.createElement('button');

        const cardNumberInputContainer = document.createElement('div');
        const validThruInputContainer = document.createElement('div');
        const cvvInputContainer = document.createElement('div');
        cardNumberInputContainer.classList.add('input__container');
        validThruInputContainer.classList.add('input__container');
        cvvInputContainer.classList.add('input__container');

        const cardNumberInputMessage = document.createElement('div');
        const validThruInputMessage = document.createElement('div');
        const cvvInputMessage = document.createElement('div');
        cardNumberInputMessage.classList.add('input__message');
        validThruInputMessage.classList.add('input__message');
        cvvInputMessage.classList.add('input__message');

        cardNumberInputContainer.append(cardNumberInputMessage, this.cardNumberInput);
        validThruInputContainer.append(validThruInputMessage, this.validThruInput);
        cvvInputContainer.append(cvvInputMessage, this.cvvInput);

        cardInfoContainer.classList.add('purchase-form__card-info-container');
        cardInfoTitle.classList.add('purchase-form__card-info-title');
        this.cardNumberTitle.classList.add('purchase-form__card-number-title');
        this.cardNumberInput.classList.add('purchase-form__card-number');
        thruCvvContainer.classList.add('purchase-form__card-thru-cvv-container');
        validThruContainer.classList.add('purchase-form__card-THRU-container');
        validThruForm.classList.add('purchase-form__card-THRU-form');
        this.validThruInput.classList.add('purchase-form__card-THRU');
        cvvContainer.classList.add('purchase-form__card-CVV-container');
        cvvForm.classList.add('purchase-form__card-CVV-form');
        this.cvvInput.classList.add('purchase-form__card-CVV');
        this.confirmButton.classList.add('purchase-form__confirm-button');
        this.confirmButton.classList.add('button');

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
        this.cardNumberTitle.innerText = 'Payment system:';
        this.cardNumberInput.placeholder = 'Card number';
        validThruForm.value = 'VALID:';
        this.validThruInput.placeholder = 'Valid THRU';
        cvvForm.value = 'CVV:';
        this.cvvInput.placeholder = 'Code';
        this.confirmButton.innerText = 'CONFIRM';

        this.cardNumberInput.required = true;
        this.cardNumberInput.maxLength = 12;
        this.validThruInput.required = true;
        this.validThruInput.maxLength = 5;
        this.cvvInput.required = true;
        this.cvvInput.maxLength = 3;

        this.cardNumberInput.type = 'number';
        this.validThruInput.type = 'text';
        this.cvvInput.type = 'number';

        this.cardNumberTitle.append(this.cardNumberImg);
        validThruContainer.append(validThruForm, validThruInputContainer);
        cvvContainer.append(cvvForm, cvvInputContainer);
        thruCvvContainer.append(validThruContainer, cvvContainer);
        cardInfoContainer.append(
            cardInfoTitle,
            cardNumberInputContainer,
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
                const message = input.previousElementSibling;
                if (this.validation(input)) {
                    input.classList.add('valid');
                    if (message) (message as HTMLElement).innerText = 'Valid';
                } else {
                    input.classList.remove('valid');
                }
            });

            input.addEventListener('blur', () => {
                input.classList.add('blur');

                if (input === this.validThruInput) {
                    const currentValue = input.value;
                    if (currentValue.length === 4) {
                        input.value = currentValue.slice(0, 2) + '/' + currentValue.slice(2, 4);
                    }
                }
            });

            input.addEventListener('focus', () => {
                input.classList.remove('blur');

                if (input === this.validThruInput) {
                    const currentValue = input.value;
                    if (currentValue.length === 5) {
                        input.value = currentValue.slice(0, 2) + currentValue.slice(3, 5);
                    }
                }
            });
        });

        this.cardNumberInput.addEventListener('input', () => {
            const currentValue = this.cardNumberInput.value;
            const message = this.cardNumberInput.previousElementSibling;
            if (currentValue[0] === '2') {
                this.cardNumberTitle.innerText = 'Payment system: МИР';
                this.cardNumberImg.src = 'http://img.advertology.ru/aimages/2018/03/19/Mir_Logo_Id_04.jpg';
            } else if (currentValue[0] === '4') {
                this.cardNumberTitle.innerText = 'Payment system: VISA';
            } else if (currentValue[0] === '7') {
                this.cardNumberTitle.innerText = 'Payment system: УЭК';
            } else if (currentValue[0] === '5') {
                this.cardNumberTitle.innerText = 'Payment system: MasterCard';
            } else if (currentValue.slice(0, 2) === '51') {
                this.cardNumberTitle.innerText = 'Payment system: Maestro';
            } else {
                this.cardNumberTitle.innerText = 'Payment system: ';
            }
            if (currentValue.length > 16) {
                this.cardNumberInput.value = currentValue.slice(0, 16);
                if (this.validation(this.cardNumberInput)) {
                    this.cardNumberInput.classList.add('valid');
                    if (message) (message as HTMLElement).innerText = 'Valid';
                } else {
                    this.cardNumberInput.classList.remove('valid');
                    if (message) (message as HTMLElement).innerText = '';
                }
            }
        });

        this.validThruInput.addEventListener('input', () => {
            const currentValue = this.validThruInput.value;

            const eng = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const rus = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
            const symbols = '~`!@#$%^&*()_-=+}{][";:>.<,*';

            if (currentValue.length > 4) this.validThruInput.value = currentValue.slice(0, 4);

            if (
                eng.includes(currentValue[currentValue.length - 1].toUpperCase()) ||
                rus.includes(currentValue[currentValue.length - 1].toUpperCase()) ||
                symbols.includes(currentValue[currentValue.length - 1])
            ) {
                this.validThruInput.value = currentValue.slice(0, currentValue.length - 1);
            }
        });

        this.cvvInput.addEventListener('input', () => {
            const currentValue = this.cvvInput.value;
            if (currentValue.length > 3) this.cvvInput.value = currentValue.slice(0, 3);
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
                    this.props.cart.clearCart();
                    this.props.modal.detach();
                    this.props.router.navigateTo('catalog');
                }, 3000);
            }
        });
    }

    private validation(input: HTMLInputElement): boolean {
        input.classList.remove('valid');
        input.classList.remove('invalid');
        if (input === this.personNameInput && this.isValidName(input.value)) return true;
        if (input === this.personPhoneInput && this.isValidPhone(input.value)) return true;
        if (input === this.personAddressInput && this.isValidAddress(input.value)) return true;
        if (input === this.personMailInput && this.isMailValid(input.value)) return true;
        if (input === this.cardNumberInput && this.isValidCardNumber(input.value)) return true;
        if (input === this.validThruInput && this.isValidTHRU(input.value)) return true;
        if (input === this.cvvInput && this.isValidCVV(input.value)) return true;
        const message = input.previousElementSibling;
        if (message) (message as HTMLElement).innerText = 'Error';
        input.classList.add('invalid');
        return false;
    }

    private isValidName(name: string): boolean {
        if (name.length < 7 || !name.includes(' ')) return false;
        const eng = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const rus = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

        const words = name.trim().split(' ').length >= 2;

        const wordsLength = name
            .trim()
            .split(' ')
            .every((word) => word.length >= 3);

        const letters = name
            .trim()
            .split('')
            .every((letter) => {
                if (letter === ' ') return true;
                const upLetter = letter.toUpperCase();
                return eng.includes(upLetter) || rus.includes(upLetter);
            });

        return words && wordsLength && letters;
    }

    private isValidPhone(phone: string): boolean {
        const phoneTrimmed = phone.split(' ').join('');
        if (phoneTrimmed.length < 10 || phoneTrimmed.slice(0, 1) !== '+') return false;
        return this.isValidNumbers(phoneTrimmed.slice(1));
    }

    private isValidNumbers(numberStr: string): boolean {
        return numberStr.split('').every((number) => Number(number) >= 0);
    }

    private isValidAddress(address: string): boolean {
        if (address.length < 17) return false;
        const eng = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const rus = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        const unwantedSymbols = '~`!@$%^*_+={}[]|;:';

        const words = address.trim().split(' ').length >= 3;
        const wordsLength = address
            .trim()
            .split(' ')
            .every((word) => word.length >= 5);

        const freeFromSymbols = address.split('').every((symbol) => !unwantedSymbols.includes(symbol));
        const hasLetters = address.split('').some((symbol) => {
            return eng.includes(symbol.toUpperCase()) || rus.includes(symbol.toUpperCase());
        });
        return freeFromSymbols && hasLetters && words && wordsLength;
    }

    private isMailValid(mail: string): boolean {
        if (!mail.includes('@')) return false;
        const atSignIndex = mail.indexOf('@');
        return mail.slice(atSignIndex).length > 2 && mail.slice(0, atSignIndex).length > 2;
    }

    private isValidTHRU(numberStr: string) {
        if (numberStr.length < 4) return false;
        const months = Number(numberStr.slice(0, 2));
        const month = Number(numberStr.slice(2, 4));
        return months <= 12 && months >= 1 && month <= 31 && month >= 1;
    }

    private isValidCVV(numberStr: string) {
        if (numberStr.length < 3) return false;
        return this.isValidNumbers(numberStr);
    }

    private isValidCardNumber(creditCardNumber: string): boolean {
        if (creditCardNumber.toString().length !== 16) return false;
        return true;
    }
}
