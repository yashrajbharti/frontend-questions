/**
 * LocalStorage API
 *
 * Synchronous key-value storage (5-10MB).
 * Data persists even after browser closes.
 * Same-origin policy applies.
 */

// Basic operations

// 1. Set item
localStorage.setItem("username", "john_doe");
localStorage.setItem("theme", "dark");

// 2. Get item
const username = localStorage.getItem("username");
console.log(username); // 'john_doe'

// 3. Remove item
localStorage.removeItem("username");

// 4. Clear all
localStorage.clear();

// 5. Get key by index
const firstKey = localStorage.key(0);

// 6. Check length
const itemCount = localStorage.length;

// Working with objects (must stringify)
const user = { name: "Alice", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

const retrieved = JSON.parse(localStorage.getItem("user"));
console.log(retrieved.name); // 'Alice'

// Storage wrapper class
class LocalStorage {
  // Set with automatic JSON handling
  static set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error("LocalStorage set error:", error);
      return false;
    }
  }

  // Get with automatic JSON parsing
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("LocalStorage get error:", error);
      return defaultValue;
    }
  }

  // Remove item
  static remove(key) {
    localStorage.removeItem(key);
  }

  // Clear all
  static clear() {
    localStorage.clear();
  }

  // Check if key exists
  static has(key) {
    return localStorage.getItem(key) !== null;
  }

  // Get all keys
  static keys() {
    return Object.keys(localStorage);
  }

  // Get all as object
  static getAll() {
    const items = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      items[key] = this.get(key);
    }
    return items;
  }

  // Get size in bytes
  static size() {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }
}

// With expiration
class StorageWithExpiry {
  static set(key, value, ttlMs) {
    const item = {
      value: value,
      expiry: Date.now() + ttlMs,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static get(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);

    // Check if expired
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}

// Practical examples

// 1. Form data persistence
class FormStorage {
  constructor(formId) {
    this.formId = formId;
    this.key = `form_${formId}`;
  }

  save(data) {
    LocalStorage.set(this.key, {
      data,
      timestamp: Date.now(),
    });
  }

  load() {
    const stored = LocalStorage.get(this.key);
    return stored ? stored.data : null;
  }

  clear() {
    LocalStorage.remove(this.key);
  }

  getTimestamp() {
    const stored = LocalStorage.get(this.key);
    return stored ? stored.timestamp : null;
  }
}

// Usage
const formStorage = new FormStorage("contact-form");
formStorage.save({ name: "John", email: "john@example.com" });
const savedData = formStorage.load();

// 2. User preferences
class UserPreferences {
  static save(prefs) {
    LocalStorage.set("user_preferences", prefs);
  }

  static load() {
    return LocalStorage.get("user_preferences", {
      theme: "light",
      language: "en",
      notifications: true,
    });
  }

  static update(key, value) {
    const prefs = this.load();
    prefs[key] = value;
    this.save(prefs);
  }

  static get(key) {
    const prefs = this.load();
    return prefs[key];
  }
}

// 3. Shopping cart persistence
class CartStorage {
  static add(product) {
    const cart = this.getCart();
    cart.push(product);
    LocalStorage.set("cart", cart);
  }

  static remove(productId) {
    const cart = this.getCart();
    const filtered = cart.filter((item) => item.id !== productId);
    LocalStorage.set("cart", filtered);
  }

  static getCart() {
    return LocalStorage.get("cart", []);
  }

  static clear() {
    LocalStorage.remove("cart");
  }

  static getCount() {
    return this.getCart().length;
  }

  static getTotal() {
    return this.getCart().reduce((sum, item) => sum + item.price, 0);
  }
}

// 4. Recently viewed items
class RecentlyViewed {
  static add(item, maxItems = 10) {
    const recent = this.getAll();

    // Remove if already exists
    const filtered = recent.filter((i) => i.id !== item.id);

    // Add to beginning
    filtered.unshift(item);

    // Limit to maxItems
    const limited = filtered.slice(0, maxItems);

    LocalStorage.set("recently_viewed", limited);
  }

  static getAll() {
    return LocalStorage.get("recently_viewed", []);
  }

  static clear() {
    LocalStorage.remove("recently_viewed");
  }
}

// 5. Cache with TTL
class Cache {
  static set(key, value, ttlMinutes = 60) {
    StorageWithExpiry.set(`cache_${key}`, value, ttlMinutes * 60 * 1000);
  }

  static get(key) {
    return StorageWithExpiry.get(`cache_${key}`);
  }

  static has(key) {
    return this.get(key) !== null;
  }

  static invalidate(key) {
    LocalStorage.remove(`cache_${key}`);
  }

  static clearAll() {
    const keys = LocalStorage.keys();
    keys.forEach((key) => {
      if (key.startsWith("cache_")) {
        LocalStorage.remove(key);
      }
    });
  }
}

// 6. Storage events (listen for changes in other tabs)
window.addEventListener("storage", (e) => {
  console.log("Storage changed:");
  console.log("Key:", e.key);
  console.log("Old value:", e.oldValue);
  console.log("New value:", e.newValue);
  console.log("URL:", e.url);
});

// Storage sync between tabs
class StorageSync {
  static broadcast(key, value) {
    LocalStorage.set(key, value);
    // Triggers storage event in other tabs
  }

  static listen(key, callback) {
    window.addEventListener("storage", (e) => {
      if (e.key === key) {
        callback(JSON.parse(e.newValue));
      }
    });
  }
}

// 7. Namespaced storage
class NamespacedStorage {
  constructor(namespace) {
    this.namespace = namespace;
  }

  _getKey(key) {
    return `${this.namespace}:${key}`;
  }

  set(key, value) {
    LocalStorage.set(this._getKey(key), value);
  }

  get(key, defaultValue) {
    return LocalStorage.get(this._getKey(key), defaultValue);
  }

  remove(key) {
    LocalStorage.remove(this._getKey(key));
  }

  clear() {
    const keys = LocalStorage.keys();
    keys.forEach((key) => {
      if (key.startsWith(`${this.namespace}:`)) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Usage
const appStorage = new NamespacedStorage("myapp");
appStorage.set("setting", "value");

// 8. Storage utilities
const StorageUtils = {
  // Check if localStorage is available
  isAvailable() {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  // Get remaining space (approximate)
  getRemainingSpace() {
    let used = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
      }
    }
    // Most browsers allow 5-10MB
    const total = 5 * 1024 * 1024; // 5MB estimate
    return total - used;
  },

  // Export all data
  export() {
    return LocalStorage.getAll();
  },

  // Import data
  import(data) {
    for (const key in data) {
      LocalStorage.set(key, data[key]);
    }
  },

  // Backup to file
  backup() {
    const data = this.export();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `localStorage-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
};

export {
  LocalStorage,
  StorageWithExpiry,
  FormStorage,
  UserPreferences,
  CartStorage,
  RecentlyViewed,
  Cache,
  StorageSync,
  NamespacedStorage,
  StorageUtils,
};
