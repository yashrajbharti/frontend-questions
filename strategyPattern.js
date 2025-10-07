/**
 * Strategy Pattern
 * 
 * Defines a family of algorithms, encapsulates each one,
 * and makes them interchangeable at runtime.
 */

// Sorting Strategies
class BubbleSort {
  sort(arr) {
    const array = [...arr];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    return array;
  }
}

class QuickSort {
  sort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...this.sort(left), ...middle, ...this.sort(right)];
  }
}

class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(data) {
    return this.strategy.sort(data);
  }
}

// Usage
const sorter = new Sorter(new BubbleSort());
console.log(sorter.sort([5, 2, 8, 1, 9]));

sorter.setStrategy(new QuickSort());
console.log(sorter.sort([5, 2, 8, 1, 9]));

// Validation Strategies
class EmailValidator {
  validate(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

class PhoneValidator {
  validate(value) {
    return /^\d{10}$/.test(value);
  }
}

class URLValidator {
  validate(value) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
}

class Validator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  validate(value) {
    return this.strategy.validate(value);
  }
}

// Payment Strategies
class CreditCardPayment {
  pay(amount) {
    console.log(`Paid $${amount} with Credit Card`);
    return { success: true, method: 'credit_card' };
  }
}

class PayPalPayment {
  pay(amount) {
    console.log(`Paid $${amount} with PayPal`);
    return { success: true, method: 'paypal' };
  }
}

class CryptoPayment {
  pay(amount) {
    console.log(`Paid $${amount} with Cryptocurrency`);
    return { success: true, method: 'crypto' };
  }
}

class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setPaymentMethod(strategy) {
    this.strategy = strategy;
  }

  processPayment(amount) {
    return this.strategy.pay(amount);
  }
}

// Compression Strategies
class GzipCompression {
  compress(data) {
    console.log('Compressing with gzip');
    return `gzip:${data}`;
  }

  decompress(data) {
    return data.replace('gzip:', '');
  }
}

class Brotli Compression {
  compress(data) {
    console.log('Compressing with brotli');
    return `brotli:${data}`;
  }

  decompress(data) {
    return data.replace('brotli:', '');
  }
}

class Compressor {
  constructor(strategy) {
    this.strategy = strategy;
  }

  compress(data) {
    return this.strategy.compress(data);
  }

  decompress(data) {
    return this.strategy.decompress(data);
  }
}

// Auth Strategies
class LocalAuthStrategy {
  authenticate(credentials) {
    console.log('Authenticating with username/password');
    return { success: true, user: { id: 1, name: 'User' } };
  }
}

class OAuthStrategy {
  authenticate(provider) {
    console.log(`Authenticating with ${provider}`);
    return { success: true, user: { id: 2, name: 'OAuth User' } };
  }
}

class JWTStrategy {
  authenticate(token) {
    console.log('Authenticating with JWT token');
    return { success: true, user: { id: 3, name: 'JWT User' } };
  }
}

class Authenticator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  login(credentials) {
    return this.strategy.authenticate(credentials);
  }
}

// Storage Strategies
class LocalStorageStrategy {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  load(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}

class SessionStorageStrategy {
  save(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  load(key) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}

class MemoryStorageStrategy {
  constructor() {
    this.store = new Map();
  }

  save(key, value) {
    this.store.set(key, value);
  }

  load(key) {
    return this.store.get(key);
  }
}

class DataStore {
  constructor(strategy) {
    this.strategy = strategy;
  }

  save(key, value) {
    this.strategy.save(key, value);
  }

  load(key) {
    return this.strategy.load(key);
  }
}

export {
  BubbleSort,
  QuickSort,
  Sorter,
  EmailValidator,
  PhoneValidator,
  URLValidator,
  Validator,
  CreditCardPayment,
  PayPalPayment,
  CryptoPayment,
  PaymentProcessor,
  LocalAuthStrategy,
  OAuthStrategy,
  JWTStrategy,
  Authenticator,
  LocalStorageStrategy,
  SessionStorageStrategy,
  MemoryStorageStrategy,
  DataStore
};
