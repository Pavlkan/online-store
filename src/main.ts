import { FooterController } from "./controller/FooterController";
import { HeaderController } from "./controller/HeaderController";
import { OnlineStore } from "./model/OnlineStore";
import { Router } from "./view/Router";
import "./styles.css";

const root = document.createElement("div");
root.id = "root";
const main = document.createElement("main");
main.classList.add("main");

const onlineStore: OnlineStore = new OnlineStore();

const router = new Router(main, onlineStore);

const headerController = new HeaderController(router);

root.append(headerController.component.element, main);

const footerController = new FooterController();

root.append(footerController.component.element);

document.body.append(root);
