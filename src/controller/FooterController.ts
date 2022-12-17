import { FooterComponent } from '../view/components/footer/FooterComponent';
import { BaseController } from './BaseController';

export class FooterController extends BaseController<FooterComponent> {
  public component: FooterComponent;

  constructor() {
    super();
    this.component = new FooterComponent(this);
  }


}