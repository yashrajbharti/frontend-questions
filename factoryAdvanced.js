/**
 * Factory Pattern - Advanced
 * 
 * Creates objects without specifying the exact class.
 * Provides an interface for creating objects in a superclass.
 */

// Simple Factory
class ButtonFactory {
  static create(type) {
    switch (type) {
      case 'primary':
        return new PrimaryButton();
      case 'secondary':
        return new SecondaryButton();
      case 'danger':
        return new DangerButton();
      default:
        throw new Error(`Unknown button type: ${type}`);
    }
  }
}

class PrimaryButton {
  render() {
    return '<button class="btn-primary">Click Me</button>';
  }
}

class SecondaryButton {
  render() {
    return '<button class="btn-secondary">Click Me</button>';
  }
}

class DangerButton {
  render() {
    return '<button class="btn-danger">Delete</button>';
  }
}

// Usage
const btn1 = ButtonFactory.create('primary');
const btn2 = ButtonFactory.create('danger');

// Factory Method Pattern
class UIComponent {
  createButton() {
    throw new Error('createButton() must be implemented');
  }

  render() {
    const button = this.createButton();
    return button.render();
  }
}

class LightTheme extends UIComponent {
  createButton() {
    return {
      render: () => '<button class="light-btn">Button</button>'
    };
  }
}

class DarkTheme extends UIComponent {
  createButton() {
    return {
      render: () => '<button class="dark-btn">Button</button>'
    };
  }
}

// Abstract Factory Pattern
class UIFactory {
  createButton() {}
  createInput() {}
  createCard() {}
}

class MaterialUIFactory extends UIFactory {
  createButton() {
    return {
      render: () => '<button class="material-btn">Material Button</button>'
    };
  }

  createInput() {
    return {
      render: () => '<input class="material-input" />'
    };
  }

  createCard() {
    return {
      render: () => '<div class="material-card">Card Content</div>'
    };
  }
}

class BootstrapUIFactory extends UIFactory {
  createButton() {
    return {
      render: () => '<button class="btn btn-primary">Bootstrap Button</button>'
    };
  }

  createInput() {
    return {
      render: () => '<input class="form-control" />'
    };
  }

  createCard() {
    return {
      render: () => '<div class="card">Card Content</div>'
    };
  }
}

// Application using Abstract Factory
class Application {
  constructor(factory) {
    this.factory = factory;
  }

  renderUI() {
    const button = this.factory.createButton();
    const input = this.factory.createInput();
    const card = this.factory.createCard();

    return `
      ${button.render()}
      ${input.render()}
      ${card.render()}
    `;
  }
}

// Practical examples

// 1. HTTP Client Factory
class HTTPClientFactory {
  static create(type = 'fetch') {
    switch (type) {
      case 'fetch':
        return new FetchClient();
      case 'axios':
        return new AxiosClient();
      case 'xhr':
        return new XHRClient();
      default:
        return new FetchClient();
    }
  }
}

class FetchClient {
  async get(url) {
    const response = await fetch(url);
    return response.json();
  }

  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  }
}

class AxiosClient {
  async get(url) {
    // Would use axios
    console.log('Using Axios:', url);
  }

  async post(url, data) {
    console.log('Posting with Axios:', url, data);
  }
}

class XHRClient {
  get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = reject;
      xhr.send();
    });
  }
}

// 2. Notification Factory
class NotificationFactory {
  static create(type, message) {
    const notifications = {
      email: () => new EmailNotification(message),
      sms: () => new SMSNotification(message),
      push: () => new PushNotification(message),
      toast: () => new ToastNotification(message)
    };

    const creator = notifications[type];
    if (!creator) throw new Error(`Unknown notification type: ${type}`);

    return creator();
  }
}

class EmailNotification {
  constructor(message) {
    this.message = message;
  }

  send() {
    console.log(`Sending email: ${this.message}`);
  }
}

class SMSNotification {
  constructor(message) {
    this.message = message;
  }

  send() {
    console.log(`Sending SMS: ${this.message}`);
  }
}

class PushNotification {
  constructor(message) {
    this.message = message;
  }

  send() {
    console.log(`Sending push: ${this.message}`);
  }
}

class ToastNotification {
  constructor(message) {
    this.message = message;
  }

  send() {
    console.log(`Showing toast: ${this.message}`);
  }
}

// 3. Chart Factory
class ChartFactory {
  static create(type, data, config) {
    const charts = new Map([
      ['line', LineChart],
      ['bar', BarChart],
      ['pie', PieChart],
      ['scatter', ScatterChart]
    ]);

    const ChartClass = charts.get(type);
    if (!ChartClass) throw new Error(`Unknown chart type: ${type}`);

    return new ChartClass(data, config);
  }
}

class LineChart {
  constructor(data, config) {
    this.data = data;
    this.config = config;
  }

  render() {
    return `Rendering line chart with ${this.data.length} points`;
  }
}

class BarChart {
  constructor(data, config) {
    this.data = data;
    this.config = config;
  }

  render() {
    return `Rendering bar chart with ${this.data.length} bars`;
  }
}

class PieChart {
  constructor(data, config) {
    this.data = data;
    this.config = config;
  }

  render() {
    return `Rendering pie chart with ${this.data.length} slices`;
  }
}

class ScatterChart {
  constructor(data, config) {
    this.data = data;
    this.config = config;
  }

  render() {
    return `Rendering scatter chart with ${this.data.length} points`;
  }
}

// 4. Validator Factory
class ValidatorFactory {
  static validators = new Map();

  static register(type, validator) {
    this.validators.set(type, validator);
  }

  static create(type) {
    const validator = this.validators.get(type);
    if (!validator) throw new Error(`Unknown validator: ${type}`);
    return validator;
  }
}

// Register validators
ValidatorFactory.register('email', {
  validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
});

ValidatorFactory.register('phone', {
  validate: (value) => /^\d{10}$/.test(value)
});

ValidatorFactory.register('url', {
  validate: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
});

// 5. Storage Factory (with strategy)
class StorageFactory {
  static create(type) {
    switch (type) {
      case 'local':
        return new LocalStorageAdapter();
      case 'session':
        return new SessionStorageAdapter();
      case 'memory':
        return new MemoryStorageAdapter();
      default:
        return new LocalStorageAdapter();
    }
  }
}

class LocalStorageAdapter {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}

class SessionStorageAdapter {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  remove(key) {
    sessionStorage.removeItem(key);
  }
}

class MemoryStorageAdapter {
  constructor() {
    this.store = new Map();
  }

  set(key, value) {
    this.store.set(key, value);
  }

  get(key) {
    return this.store.get(key);
  }

  remove(key) {
    this.store.delete(key);
  }
}

export {
  ButtonFactory,
  UIFactory,
  MaterialUIFactory,
  BootstrapUIFactory,
  HTTPClientFactory,
  NotificationFactory,
  ChartFactory,
  ValidatorFactory,
  StorageFactory
};
