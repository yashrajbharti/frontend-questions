class ObservableArray {
  constructor(initialArray = []) {
    this.array = [...initialArray];
    this.eventTarget = new EventTarget();
  }

  push(...items) {
    this.array.push(...items);

    // Dispatch a custom event
    const event = new CustomEvent("arrayPush", { detail: { items } });
    this.eventTarget.dispatchEvent(event);
  }

  addEventListener(event, callback) {
    this.eventTarget.addEventListener(event, callback);
  }

  getArray() {
    return [...this.array];
  }
}

// // Example Usage:
// const arr = new ObservableArray();

// arr.addEventListener("arrayPush", (e) => {
//   console.log("New items added:", e.detail.items);
// });

// arr.push(10, 20); // Logs: New items added: [10, 20]
// console.log(arr.getArray()); // [10, 20]
