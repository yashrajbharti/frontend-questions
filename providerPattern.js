// Structural Pattern

class ConfigProvider {
  constructor() {
    this.config = {
      apiUrl: "https://api.example.com",
      theme: "dark",
    };
  }

  getConfig(key) {
    return this.config[key];
  }
}

// Singleton Provider Instance
const provider = new ConfigProvider();

// Usage
console.log(provider.getConfig("apiUrl")); // "https://api.example.com"
console.log(provider.getConfig("theme")); // "dark"

// The ConfigProvider centralizes app configurations.
// Other modules can access configurations via getConfig(), avoiding hardcoding values.
