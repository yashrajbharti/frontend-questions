// ✅ How MVP Works?
// Model → Manages data & business logic.
// View → Displays UI but has no logic.
// Presenter → Handles all logic & updates the View.

// Model (Data & Business Logic)
class Model {
  fetchMessage() {
    return "Hello from MVP!";
  }
}

// View (Only UI)
class View {
  constructor() {
    this.app = document.getElementById("app");
  }
  render(message) {
    this.app.innerHTML = `<h1>${message}</h1>`;
  }
}

// Presenter (Handles Interaction)
class Presenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }
  initialize() {
    const message = this.model.fetchMessage();
    this.view.render(message);
  }
}

// Instantiate MVP Components
const model = new Model();
const view = new View();
const presenter = new Presenter(view, model);
presenter.initialize();
