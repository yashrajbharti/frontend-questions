/**
 * Facade Pattern
 * 
 * Provides a simplified interface to a complex subsystem.
 * Hides complexity and provides a cleaner API.
 */

// Example: DOM Manipulation Facade
class DOMFacade {
  // Simplified element selection
  select(selector) {
    return document.querySelector(selector);
  }

  selectAll(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  // Simplified event handling
  on(selector, event, handler) {
    const element = this.select(selector);
    if (element) {
      element.addEventListener(event, handler);
    }
  }

  // Simplified AJAX
  async get(url) {
    const response = await fetch(url);
    return response.json();
  }

  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  // Simplified animations
  fadeIn(selector, duration = 400) {
    const element = this.select(selector);
    if (!element) return;

    element.style.opacity = '0';
    element.style.display = 'block';

    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      element.style.opacity = Math.min(progress / duration, 1);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  fadeOut(selector, duration = 400) {
    const element = this.select(selector);
    if (!element) return;

    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      element.style.opacity = Math.max(1 - progress / duration, 0);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    };

    requestAnimationFrame(animate);
  }
}

// Usage
const dom = new DOMFacade();
dom.on('#button', 'click', () => {
  dom.fadeOut('#modal');
});

// Example: API Facade
class APIFacade {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Simplified methods
  async getUsers() {
    return this.request('/users');
  }

  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE'
    });
  }
}

// Example: Storage Facade
class StorageFacade {
  // Unified interface for different storage types
  set(key, value, type = 'local') {
    const serialized = JSON.stringify({
      value,
      timestamp: Date.now()
    });

    if (type === 'local') {
      localStorage.setItem(key, serialized);
    } else if (type === 'session') {
      sessionStorage.setItem(key, serialized);
    }
  }

  get(key, type = 'local') {
    let item;
    if (type === 'local') {
      item = localStorage.getItem(key);
    } else if (type === 'session') {
      item = sessionStorage.getItem(key);
    }

    if (!item) return null;

    try {
      const parsed = JSON.parse(item);
      return parsed.value;
    } catch {
      return null;
    }
  }

  remove(key, type = 'local') {
    if (type === 'local') {
      localStorage.removeItem(key);
    } else if (type === 'session') {
      sessionStorage.removeItem(key);
    }
  }

  clear(type = 'local') {
    if (type === 'local') {
      localStorage.clear();
    } else if (type === 'session') {
      sessionStorage.clear();
    }
  }

  // Advanced features
  setWithExpiry(key, value, ttlMs, type = 'local') {
    const item = {
      value,
      expiry: Date.now() + ttlMs
    };
    const serialized = JSON.stringify(item);

    if (type === 'local') {
      localStorage.setItem(key, serialized);
    } else if (type === 'session') {
      sessionStorage.setItem(key, serialized);
    }
  }

  getWithExpiry(key, type = 'local') {
    let item;
    if (type === 'local') {
      item = localStorage.getItem(key);
    } else if (type === 'session') {
      item = sessionStorage.getItem(key);
    }

    if (!item) return null;

    try {
      const parsed = JSON.parse(item);
      if (parsed.expiry && Date.now() > parsed.expiry) {
        this.remove(key, type);
        return null;
      }
      return parsed.value;
    } catch {
      return null;
    }
  }
}

// Example: Form Validation Facade
class ValidationFacade {
  constructor() {
    this.errors = {};
  }

  validate(formData, rules) {
    this.errors = {};

    for (const [field, value] of Object.entries(formData)) {
      const fieldRules = rules[field];
      if (!fieldRules) continue;

      for (const rule of fieldRules) {
        if (!this.runRule(rule, value, field)) {
          break; // Stop on first error
        }
      }
    }

    return Object.keys(this.errors).length === 0;
  }

  runRule(rule, value, field) {
    if (rule.required && !value) {
      this.errors[field] = `${field} is required`;
      return false;
    }

    if (rule.minLength && value.length < rule.minLength) {
      this.errors[field] = `${field} must be at least ${rule.minLength} characters`;
      return false;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      this.errors[field] = `${field} must be less than ${rule.maxLength} characters`;
      return false;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      this.errors[field] = rule.message || `${field} is invalid`;
      return false;
    }

    if (rule.custom && !rule.custom(value)) {
      this.errors[field] = rule.message || `${field} is invalid`;
      return false;
    }

    return true;
  }

  getErrors() {
    return this.errors;
  }

  hasError(field) {
    return field in this.errors;
  }

  getError(field) {
    return this.errors[field];
  }
}

// Usage
const validator = new ValidationFacade();
const isValid = validator.validate(
  { email: 'test@example.com', password: '123' },
  {
    email: [
      { required: true },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
    ],
    password: [
      { required: true },
      { minLength: 8 }
    ]
  }
);

// Example: Browser Facade
class BrowserFacade {
  // Simplified browser detection
  isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  }

  isFirefox() {
    return /Firefox/.test(navigator.userAgent);
  }

  isSafari() {
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  }

  // Simplified cookie handling
  setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  }

  getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) return value;
    }
    return null;
  }

  // Simplified clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  async readFromClipboard() {
    try {
      return await navigator.clipboard.readText();
    } catch {
      return null;
    }
  }

  // Simplified notifications
  async requestNotificationPermission() {
    if (!('Notification' in window)) return false;
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  showNotification(title, options = {}) {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }

  // Simplified geolocation
  async getLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
        reject
      );
    });
  }
}

export {
  DOMFacade,
  APIFacade,
  StorageFacade,
  ValidationFacade,
  BrowserFacade
};
