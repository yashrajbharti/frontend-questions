/**
 * IndexedDB API
 * 
 * Client-side database for storing large amounts of structured data.
 * Asynchronous, supports transactions, can store objects, files, blobs.
 * Much larger storage than localStorage (50MB+, up to GBs).
 */

// Basic setup
class Database {
  constructor(dbName, version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }

  // Open database connection
  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      // Called when database is created or version changes
      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        this.onUpgrade(event);
      };
    });
  }

  // Override this to create object stores
  onUpgrade(event) {
    // Create object stores here
  }

  close() {
    if (this.db) {
      this.db.close();
    }
  }
}

// CRUD operations example
class UserStore extends Database {
  constructor() {
    super('UserDatabase', 1);
  }

  onUpgrade(event) {
    const db = event.target.result;

    // Create object store with auto-incrementing key
    if (!db.objectStoreNames.contains('users')) {
      const objectStore = db.createObjectStore('users', {
        keyPath: 'id',
        autoIncrement: true
      });

      // Create indexes
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('name', 'name', { unique: false });
    }
  }

  // Add user
  async addUser(user) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.add(user);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get user by id
  async getUser(id) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get user by email (using index)
  async getUserByEmail(email) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const index = store.index('email');
      const request = index.get(email);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Get all users
  async getAllUsers() {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Update user
  async updateUser(user) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.put(user);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Delete user
  async deleteUser(id) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Clear all users
  async clearAll() {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readwrite');
      const store = transaction.objectStore('users');
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

// Usage example
async function example() {
  const userStore = new UserStore();

  // Add users
  await userStore.addUser({ name: 'Alice', email: 'alice@example.com' });
  await userStore.addUser({ name: 'Bob', email: 'bob@example.com' });

  // Get user
  const user = await userStore.getUser(1);
  console.log(user);

  // Update user
  user.name = 'Alice Updated';
  await userStore.updateUser(user);

  // Delete user
  await userStore.deleteUser(2);

  // Get all users
  const allUsers = await userStore.getAllUsers();
  console.log(allUsers);
}

// Cursor iteration (for large datasets)
class ProductStore extends Database {
  constructor() {
    super('ProductDatabase', 1);
  }

  onUpgrade(event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('products')) {
      const store = db.createObjectStore('products', { keyPath: 'id' });
      store.createIndex('price', 'price', { unique: false });
      store.createIndex('category', 'category', { unique: false });
    }
  }

  // Iterate with cursor
  async getProductsByCategory(category) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['products'], 'readonly');
      const store = transaction.objectStore('products');
      const index = store.index('category');
      const request = index.openCursor(IDBKeyRange.only(category));
      const results = [];

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue(); // Move to next
        } else {
          resolve(results); // Done
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  // Range queries
  async getProductsInPriceRange(min, max) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['products'], 'readonly');
      const store = transaction.objectStore('products');
      const index = store.index('price');
      const range = IDBKeyRange.bound(min, max);
      const request = index.getAll(range);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// Storing files/blobs
class FileStore extends Database {
  constructor() {
    super('FileDatabase', 1);
  }

  onUpgrade(event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('files')) {
      db.createObjectStore('files', { keyPath: 'name' });
    }
  }

  async saveFile(name, blob) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      const request = store.put({ name, blob, timestamp: Date.now() });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getFile(name) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['files'], 'readonly');
      const store = transaction.objectStore('files');
      const request = store.get(name);

      request.onsuccess = () => resolve(request.result?.blob);
      request.onerror = () => reject(request.error);
    });
  }
}

// Utilities
class IndexedDBUtils {
  // Check if IndexedDB is supported
  static isSupported() {
    return 'indexedDB' in window;
  }

  // Delete database
  static deleteDatabase(dbName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(dbName);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Get all database names
  static async getDatabases() {
    if (indexedDB.databases) {
      return await indexedDB.databases();
    }
    return [];
  }

  // Get database size (approximate)
  static async getDatabaseSize(dbName) {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return estimate.usage;
    }
    return null;
  }
}

export {
  Database,
  UserStore,
  ProductStore,
  FileStore,
  IndexedDBUtils
};
