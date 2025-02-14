class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (this.map.has(key)) {
      let val = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, val);
      return val;
    } else return -1;
  }
  put(key, value) {
    if (this.get(key) === -1) {
      if (this.map.size === this.capacity) {
        for (let [key, value] of this.map) {
          this.map.delete(key);
          break;
        }
      }
    }
    this.map.set(key, value);
  }
}
