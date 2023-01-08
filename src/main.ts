import { FooterController } from './controller/FooterController';
import { HeaderController } from './controller/HeaderController';
import { OnlineStore } from './model/OnlineStore';
import './styles.css';
import { FiltersStateSynchronizer } from './view/FiltersStateSynchronizer';
import { Router } from './view/Router';

const root = document.createElement('div');
root.id = 'root';
const main = document.createElement('main');
main.classList.add('main');

const onlineStore: OnlineStore = new OnlineStore();

const router = new Router(main, onlineStore);
const headerController = new HeaderController(onlineStore, router);
new FiltersStateSynchronizer(onlineStore, router);

const footerController = new FooterController();

root.append(headerController.component.element, main, footerController.component.element);

document.body.append(root);
