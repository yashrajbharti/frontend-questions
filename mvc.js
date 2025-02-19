// How MVC Works?
// Model → Manages data & business logic.
// View → Handles the UI & presentation layer.
// Controller → Acts as an intermediary between Model & View.

// Model (Manages Data)
class Model {
  constructor() {
    this.data = "Hello, MVC!";
  }
  getData() {
    return this.data;
  }
}

// View (Handles UI)
class View {
  constructor() {
    this.app = document.getElementById("app");
  }
  render(data) {
    this.app.innerHTML = `<h1>${data}</h1>`;
  }
}

// Controller (Bridges Model & View)
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  init() {
    const data = this.model.getData();
    this.view.render(data);
  }
}

// Instantiate MVC Components
const appModel = new Model();
const appView = new View();
const appController = new Controller(appModel, appView);
appController.init();
