// Creational as well as Structural Pattern

export function add(x, y) {
  return x + y;
}

export function multiply(x, y) {
  return x * y;
}

export function subtract(x, y) {
  return x - y;
}

export function square(x) {
  return x * x;
}

export class Math {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(x, y) {
    return x + y;
  }

  subtract(x, y) {
    return x - y;
  }

  square(x) {
    return x * x;
  }

  multiply(x, y) {
    return x * y;
  }
}
