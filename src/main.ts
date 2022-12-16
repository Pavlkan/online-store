import { HeaderController } from "./controller/HeaderController";

const root = document.createElement("div");
root.id = "root";

const headerController = new HeaderController();

root.append(headerController.component.element);

document.body.append(root);
