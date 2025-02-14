class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  subscribe(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }
    this.events.get(eventName).add(callback);

    return { unsubscribe: () => this.unsubscribe(eventName, callback) };
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) return [];

    const listeners = this.events.get(eventName);
    const results = [];

    for (const listener of listeners) {
      try {
        results.push(listener(...args));
      } catch (error) {
        console.error(`Error in event '${eventName}':`, error);
      }
    }

    return results;
  }

  once(eventName, callback) {
    const wrapper = (...args) => {
      this.unsubscribe(eventName, wrapper);
      callback(...args);
    };
    this.subscribe(eventName, wrapper);
  }

  unsubscribe(eventName, callback) {
    const listeners = this.events.get(eventName);
    if (listeners) {
      listeners.delete(callback);
      if (listeners.size === 0) this.events.delete(eventName); // Clean up empty events
    }
  }
}

// Example Usage
const emitter = new EventEmitter();

const sub = emitter.subscribe("data", (msg) => console.log("Received:", msg));

emitter.emit("data", "Hello, World!"); // "Received: Hello, World!"

sub.unsubscribe();

emitter.emit("data", "Hello again!"); // (No output)

// Using "once"
emitter.once("data", (msg) => console.log("One-time:", msg));

emitter.emit("data", "First call"); // "One-time: First call"
emitter.emit("data", "Second call"); // (No output)
