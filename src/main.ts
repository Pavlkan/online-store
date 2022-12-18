import { HeaderController } from "./controller/HeaderController";
import { OnlineStore } from "./model/OnlineStore";
import "./styles.css";
import { Router } from "./view/Router";

const root = document.createElement("div");
root.id = "root";
const main = document.createElement("main");
main.classList.add("main");

const onlineStore: OnlineStore = new OnlineStore();

const router = new Router(main, onlineStore);
router.navigateTo("catalogPage");
const headerController = new HeaderController();

root.append(headerController.component.element, main);

document.body.append(root);
