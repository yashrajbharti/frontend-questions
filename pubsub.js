class PubSub {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event
  subscribe(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // Publish (emit) an event
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(data));
    }
  }
}

// Create PubSub instance
const eventBus = new PubSub();

// Subscribe to an event
eventBus.subscribe("orderPlaced", (order) => {
  console.log(`📦 Order Received: ${order.id}`);
});

eventBus.subscribe("orderPlaced", (order) => {
  console.log(`📜 Logging order: ${order.id}`);
});

// Publish an event
eventBus.publish("orderPlaced", { id: 1234 });
