import { FooterController } from '../../../controller/FooterController';
import { BaseComponent } from '../../BaseComponent';
import './footer.css';

interface FooterComponentProps {
  controller: FooterController;
}

export class FooterComponent extends BaseComponent<FooterComponentProps> {
  private footerContainer!: HTMLDivElement;

  constructor(controller: FooterController) {
    super('footer', { controller }, 'footer')
  }

  protected render(): void {
    this.footerContainer = document.createElement('div');
    this.footerContainer.className = 'footer-container';

    this.footerContainer.insertAdjacentHTML('beforeend', `
    <div class="footer__developers-gitHub">
      <a class="footer__developers-gitHub-link" href="https://github.com/Pavlkan">Pavlkan</a>
      <a class="footer__developers-gitHub-link" href="https://github.com/LanaVladi">LanaVladi</a>
    </div>
    <p class="footer__year">2022</p>
    <div class="footer__RSS-logo">
      <a class="footer__RSS-logo-link" href="https://rs.school/js/">RS School</a>
    </div>
    `);

    this.element.append(this.footerContainer);
  }

}