import { FooterController } from './controller/FooterController';
import { HeaderController } from "./controller/HeaderController";
import "./styles.css";

const root = document.createElement("div");
root.id = "root";

const headerController = new HeaderController();

root.append(headerController.component.element);

const footerController = new FooterController();

root.append(footerController.component.element);

document.body.append(root);
