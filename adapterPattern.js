/**
 * Adapter Pattern
 * 
 * Converts the interface of a class into another interface clients expect.
 * Allows incompatible interfaces to work together.
 */

// Example 1: API Adapter
// Old API
class OldAPIClient {
  fetchUserData(userId) {
    return {
      user_id: userId,
      user_name: 'John Doe',
      user_email: 'john@example.com',
      creation_date: '2024-01-01'
    };
  }
}

// New API expected format
class NewAPIAdapter {
  constructor(oldClient) {
    this.oldClient = oldClient;
  }

  getUser(userId) {
    const oldData = this.oldClient.fetchUserData(userId);

    // Transform to new format
    return {
      id: oldData.user_id,
      name: oldData.user_name,
      email: oldData.user_email,
      createdAt: new Date(oldData.creation_date)
    };
  }
}

// Usage
const oldClient = new OldAPIClient();
const adapter = new NewAPIAdapter(oldClient);
const user = adapter.getUser(1);
console.log(user); // { id: 1, name: 'John Doe', ... }

// Example 2: Storage Adapter
class LocalStorageAdapter {
  get(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

class SessionStorageAdapter {
  get(key) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }
}

class CookieStorageAdapter {
  get(key) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === key) {
        return JSON.parse(decodeURIComponent(value));
      }
    }
    return null;
  }

  set(key, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))};${expires};path=/`;
  }

  remove(key) {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }

  clear() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name] = cookie.trim().split('=');
      this.remove(name);
    }
  }
}

// Universal storage interface
class StorageManager {
  constructor(adapter) {
    this.adapter = adapter;
  }

  save(key, value) {
    this.adapter.set(key, value);
  }

  load(key) {
    return this.adapter.get(key);
  }

  delete(key) {
    this.adapter.remove(key);
  }

  clearAll() {
    this.adapter.clear();
  }
}

// Usage - same interface, different storage
const localManager = new StorageManager(new LocalStorageAdapter());
const sessionManager = new StorageManager(new SessionStorageAdapter());
const cookieManager = new StorageManager(new CookieStorageAdapter());

// Example 3: Payment Gateway Adapter
class StripePayment {
  processPayment(amount, currency) {
    console.log(`Processing $${amount} ${currency} via Stripe`);
    return { success: true, transactionId: 'stripe_123' };
  }
}

class PayPalPayment {
  makePayment(total, curr) {
    console.log(`Processing $${total} ${curr} via PayPal`);
    return { status: 'completed', id: 'paypal_456' };
  }
}

// Adapters to common interface
class StripeAdapter {
  constructor(stripe) {
    this.stripe = stripe;
  }

  pay(amount, currency) {
    const result = this.stripe.processPayment(amount, currency);
    return {
      success: result.success,
      id: result.transactionId
    };
  }
}

class PayPalAdapter {
  constructor(paypal) {
    this.paypal = paypal;
  }

  pay(amount, currency) {
    const result = this.paypal.makePayment(amount, currency);
    return {
      success: result.status === 'completed',
      id: result.id
    };
  }
}

// Payment processor using adapters
class PaymentProcessor {
  constructor(paymentAdapter) {
    this.adapter = paymentAdapter;
  }

  process(amount, currency) {
    return this.adapter.pay(amount, currency);
  }
}

// Example 4: Chart Library Adapter
class Chart jsChart {
  draw(data) {
    console.log('Drawing with Chart.js:', data);
  }

  update(newData) {
    console.log('Updating Chart.js:', newData);
  }
}

class D3Chart {
  render(dataset) {
    console.log('Rendering with D3:', dataset);
  }

  refresh(dataset) {
    console.log('Refreshing D3:', dataset);
  }
}

// Universal chart interface
class ChartJSAdapter {
  constructor(chart) {
    this.chart = chart;
  }

  display(data) {
    this.chart.draw(data);
  }

  refresh(data) {
    this.chart.update(data);
  }
}

class D3Adapter {
  constructor(chart) {
    this.chart = chart;
  }

  display(data) {
    this.chart.render(data);
  }

  refresh(data) {
    this.chart.refresh(data);
  }
}

// Example 5: Logger Adapter
class ConsoleLogger {
  log(message) {
    console.log(`[LOG] ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }
}

class FileLogger {
  write(level, message) {
    // Write to file
    console.log(`Writing to file [${level}]: ${message}`);
  }
}

class SentryLogger {
  captureMessage(message, level) {
    console.log(`Sending to Sentry [${level}]: ${message}`);
  }
}

// Adapters
class ConsoleLoggerAdapter {
  constructor(logger) {
    this.logger = logger;
  }

  info(message) {
    this.logger.log(message);
  }

  error(message) {
    this.logger.error(message);
  }
}

class FileLoggerAdapter {
  constructor(logger) {
    this.logger = logger;
  }

  info(message) {
    this.logger.write('INFO', message);
  }

  error(message) {
    this.logger.write('ERROR', message);
  }
}

class SentryLoggerAdapter {
  constructor(logger) {
    this.logger = logger;
  }

  info(message) {
    this.logger.captureMessage(message, 'info');
  }

  error(message) {
    this.logger.captureMessage(message, 'error');
  }
}

// Example 6: Data Source Adapter
class XMLDataSource {
  fetchXML() {
    return '<users><user>John</user><user>Jane</user></users>';
  }
}

class JSONDataSource {
  fetchJSON() {
    return '{"users": ["John", "Jane"]}';
  }
}

// Adapter to common format
class XMLAdapter {
  constructor(source) {
    this.source = source;
  }

  getData() {
    const xml = this.source.fetchXML();
    // Parse XML and convert to array
    return ['John', 'Jane']; // Simplified
  }
}

class JSONAdapter {
  constructor(source) {
    this.source = source;
  }

  getData() {
    const json = this.source.fetchJSON();
    const data = JSON.parse(json);
    return data.users;
  }
}

// Example 7: HTTP Client Adapter
class FetchClient {
  async request(url) {
    const response = await fetch(url);
    return response.json();
  }
}

class AxiosClient {
  async request(config) {
    // axios.get(config.url)
    console.log('Axios request:', config.url);
    return { data: {} };
  }
}

// Adapters
class FetchAdapter {
  constructor(client) {
    this.client = client;
  }

  async get(url) {
    return this.client.request(url);
  }
}

class AxiosAdapter {
  constructor(client) {
    this.client = client;
  }

  async get(url) {
    const response = await this.client.request({ url, method: 'GET' });
    return response.data;
  }
}

export {
  NewAPIAdapter,
  LocalStorageAdapter,
  SessionStorageAdapter,
  CookieStorageAdapter,
  StorageManager,
  StripeAdapter,
  PayPalAdapter,
  PaymentProcessor,
  ChartJSAdapter,
  D3Adapter,
  ConsoleLoggerAdapter,
  FileLoggerAdapter,
  SentryLoggerAdapter,
  XMLAdapter,
  JSONAdapter,
  FetchAdapter,
  AxiosAdapter
};
