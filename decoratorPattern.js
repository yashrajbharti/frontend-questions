/**
 * Decorator Pattern
 * 
 * Adds new functionality to objects without modifying their structure.
 * Wraps objects to extend their behavior dynamically.
 */

// Function Decorator
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Returning cached result');
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const expensiveFunction = memoize((n) => {
  console.log('Computing...');
  return n * 2;
});

expensiveFunction(5); // Computes
expensiveFunction(5); // Returns from cache

// Timing Decorator
function measure(fn) {
  return function(...args) {
    const start = performance.now();
    const result = fn.apply(this, args);
    const end = performance.now();
    console.log(`${fn.name} took ${end - start}ms`);
    return result;
  };
}

// Logging Decorator
function logger(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn.apply(this, args);
    console.log(`${fn.name} returned`, result);
    return result;
  };
}

// Class Method Decorator (ES Decorators proposal)
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

function deprecated(message) {
  return function(target, key, descriptor) {
    const original = descriptor.value;
    
    descriptor.value = function(...args) {
      console.warn(`@deprecated: ${message}`);
      return original.apply(this, args);
    };
    
    return descriptor;
  };
}

// Validation Decorator
function validate(schema) {
  return function(target, key, descriptor) {
    const original = descriptor.value;
    
    descriptor.value = function(...args) {
      for (let i = 0; i < args.length; i++) {
        const validator = schema[i];
        if (validator && !validator(args[i])) {
          throw new Error(`Argument ${i} failed validation`);
        }
      }
      return original.apply(this, args);
    };
    
    return descriptor;
  };
}

// Object Decorator Example
class Coffee {
  cost() {
    return 5;
  }
  
  description() {
    return 'Simple coffee';
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 2;
  }
  
  description() {
    return this.coffee.description() + ', milk';
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 1;
  }
  
  description() {
    return this.coffee.description() + ', sugar';
  }
}

class WhipDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 3;
  }
  
  description() {
    return this.coffee.description() + ', whipped cream';
  }
}

// Usage
let myCoffee = new Coffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);
myCoffee = new WhipDecorator(myCoffee);

console.log(myCoffee.description()); // "Simple coffee, milk, sugar, whipped cream"
console.log(myCoffee.cost()); // 11

// API Client Decorator
class APIClient {
  async fetch(url) {
    const response = await fetch(url);
    return response.json();
  }
}

class CachingDecorator {
  constructor(client) {
    this.client = client;
    this.cache = new Map();
  }
  
  async fetch(url) {
    if (this.cache.has(url)) {
      console.log('Cache hit');
      return this.cache.get(url);
    }
    
    const data = await this.client.fetch(url);
    this.cache.set(url, data);
    return data;
  }
}

class LoggingDecorator {
  constructor(client) {
    this.client = client;
  }
  
  async fetch(url) {
    console.log(`Fetching: ${url}`);
    const start = Date.now();
    const data = await this.client.fetch(url);
    console.log(`Completed in ${Date.now() - start}ms`);
    return data;
  }
}

class RetryDecorator {
  constructor(client, maxRetries = 3) {
    this.client = client;
    this.maxRetries = maxRetries;
  }
  
  async fetch(url) {
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        return await this.client.fetch(url);
      } catch (error) {
        if (i === this.maxRetries - 1) throw error;
        console.log(`Retry ${i + 1}/${this.maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
}

// Compose decorators
let client = new APIClient();
client = new CachingDecorator(client);
client = new LoggingDecorator(client);
client = new RetryDecorator(client);

// Authorization Decorator
class AuthDecorator {
  constructor(client, token) {
    this.client = client;
    this.token = token;
  }
  
  async fetch(url, options = {}) {
    const authOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.token}`
      }
    };
    return this.client.fetch(url, authOptions);
  }
}

// Rate Limiting Decorator
class RateLimitDecorator {
  constructor(client, requestsPerSecond = 5) {
    this.client = client;
    this.interval = 1000 / requestsPerSecond;
    this.lastCallTime = 0;
  }
  
  async fetch(url) {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCallTime;
    
    if (timeSinceLastCall < this.interval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.interval - timeSinceLastCall)
      );
    }
    
    this.lastCallTime = Date.now();
    return this.client.fetch(url);
  }
}

// Data Transformation Decorator
class TransformDecorator {
  constructor(client, transformer) {
    this.client = client;
    this.transformer = transformer;
  }
  
  async fetch(url) {
    const data = await this.client.fetch(url);
    return this.transformer(data);
  }
}

// Component Decorator (React-like)
function withLoading(Component) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { ...this.state, loading: false };
    }
    
    async fetchData(...args) {
      this.setState({ loading: true });
      try {
        await super.fetchData(...args);
      } finally {
        this.setState({ loading: false });
      }
    }
  };
}

function withErrorHandling(Component) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { ...this.state, error: null };
    }
    
    async fetchData(...args) {
      try {
        this.setState({ error: null });
        await super.fetchData(...args);
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  };
}

// Composable function decorators
function compose(...decorators) {
  return function(target) {
    return decorators.reduceRight((decorated, decorator) => {
      return decorator(decorated);
    }, target);
  };
}

// Usage
const enhancedFn = compose(
  memoize,
  measure,
  logger
)((x) => x * 2);

export {
  memoize,
  measure,
  logger,
  readonly,
  deprecated,
  validate,
  CachingDecorator,
  LoggingDecorator,
  RetryDecorator,
  AuthDecorator,
  RateLimitDecorator,
  TransformDecorator,
  withLoading,
  withErrorHandling,
  compose
};
