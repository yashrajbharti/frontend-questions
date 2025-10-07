/**
 * Web Components
 * 
 * Create reusable custom HTML elements using native browser APIs:
 * - Custom Elements
 * - Shadow DOM
 * - HTML Templates
 */

// Basic Custom Element
class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background: #0056b3;
        }
      </style>
      <button>
        <slot>Click Me</slot>
      </button>
    `;
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('button-clicked', {
        bubbles: true,
        composed: true,
        detail: { timestamp: Date.now() }
      }));
    });
  }
}

// Register custom element
customElements.define('my-button', MyButton);

// Usage in HTML:
// <my-button>Custom Text</my-button>

// Custom Element with Attributes
class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'email', 'avatar'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get email() {
    return this.getAttribute('email');
  }

  set email(value) {
    this.setAttribute('email', value);
  }

  get avatar() {
    return this.getAttribute('avatar');
  }

  set avatar(value) {
    this.setAttribute('avatar', value);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          display: flex;
          align-items: center;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 15px;
        }
        .info h3 {
          margin: 0 0 5px 0;
        }
        .info p {
          margin: 0;
          color: #666;
        }
      </style>
      <div class="card">
        <img class="avatar" src="${this.avatar || 'default.jpg'}" alt="${this.name}">
        <div class="info">
          <h3>${this.name || 'Unknown'}</h3>
          <p>${this.email || 'No email'}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('user-card', UserCard);

// Usage:
// <user-card name="John Doe" email="john@example.com" avatar="john.jpg"></user-card>

// Using HTML Templates
const todoItemTemplate = document.createElement('template');
todoItemTemplate.innerHTML = `
  <style>
    .todo-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .todo-item input[type="checkbox"] {
      margin-right: 10px;
    }
    .todo-item.completed {
      opacity: 0.6;
      text-decoration: line-through;
    }
    .todo-item button {
      margin-left: auto;
      padding: 4px 8px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }
  </style>
  <div class="todo-item">
    <input type="checkbox">
    <span class="text"></span>
    <button class="delete">Delete</button>
  </div>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(todoItemTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.updateUI();
    this.setupEventListeners();
  }

  static get observedAttributes() {
    return ['text', 'completed'];
  }

  attributeChangedCallback() {
    this.updateUI();
  }

  get text() {
    return this.getAttribute('text');
  }

  set text(value) {
    this.setAttribute('text', value);
  }

  get completed() {
    return this.hasAttribute('completed');
  }

  set completed(value) {
    if (value) {
      this.setAttribute('completed', '');
    } else {
      this.removeAttribute('completed');
    }
  }

  updateUI() {
    const item = this.shadowRoot.querySelector('.todo-item');
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    const textSpan = this.shadowRoot.querySelector('.text');

    textSpan.textContent = this.text || '';
    checkbox.checked = this.completed;
    item.classList.toggle('completed', this.completed);
  }

  setupEventListeners() {
    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    const deleteBtn = this.shadowRoot.querySelector('.delete');

    checkbox.addEventListener('change', () => {
      this.completed = checkbox.checked;
      this.dispatchEvent(new CustomEvent('todo-toggled', {
        bubbles: true,
        composed: true,
        detail: { text: this.text, completed: this.completed }
      }));
    });

    deleteBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('todo-deleted', {
        bubbles: true,
        composed: true,
        detail: { text: this.text }
      }));
    });
  }
}

customElements.define('todo-item', TodoItem);

// Lifecycle callbacks example
class LifecycleExample extends HTMLElement {
  constructor() {
    super();
    console.log('constructor: Element created');
  }

  connectedCallback() {
    console.log('connectedCallback: Element added to DOM');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback: Element removed from DOM');
  }

  adoptedCallback() {
    console.log('adoptedCallback: Element moved to new document');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`attributeChangedCallback: ${name} changed from ${oldValue} to ${newValue}`);
  }
}

customElements.define('lifecycle-example', LifecycleExample);

// Autonomous Custom Element (extends nothing)
class MyComponent extends HTMLElement {
  // Full custom behavior
}

customElements.define('my-component', MyComponent);

// Customized Built-in Element (extends existing element)
class FancyButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 100);
    });
  }
}

customElements.define('fancy-button', FancyButton, { extends: 'button' });

// Usage:
// <button is="fancy-button">Click Me</button>

// Advanced: Dropdown Component
class DropdownMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .dropdown {
          position: relative;
          display: inline-block;
        }
        .toggle {
          padding: 10px 15px;
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
        }
        .menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          min-width: 150px;
          display: none;
          z-index: 1000;
        }
        .menu.open {
          display: block;
        }
        ::slotted(*) {
          display: block;
          padding: 10px 15px;
          cursor: pointer;
        }
        ::slotted(*:hover) {
          background: #f0f0f0;
        }
      </style>
      <div class="dropdown">
        <button class="toggle">
          <slot name="trigger">Menu</slot>
        </button>
        <div class="menu">
          <slot name="items"></slot>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const toggle = this.shadowRoot.querySelector('.toggle');
    const menu = this.shadowRoot.querySelector('.menu');

    toggle.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      menu.classList.toggle('open', this.isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        this.isOpen = false;
        menu.classList.remove('open');
      }
    });
  }
}

customElements.define('dropdown-menu', DropdownMenu);

// Usage:
// <dropdown-menu>
//   <span slot="trigger">Options</span>
//   <div slot="items">
//     <div>Option 1</div>
//     <div>Option 2</div>
//     <div>Option 3</div>
//   </div>
// </dropdown-menu>

export {
  MyButton,
  UserCard,
  TodoItem,
  LifecycleExample,
  FancyButton,
  DropdownMenu
};
