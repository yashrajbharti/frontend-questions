// Structural Pattern
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!"),
};

// Object.assign(target, source)
// Object.assign(target, source1, source2, source3)
Object.assign(Dog.prototype, dogFunctionality);

const pet1 = new Dog("Daisy");

pet1.name; // Daisy
pet1.bark(); // Woof!
pet1.play(); // Playing!

// When multiple unrelated classes have same behavior so we don't want inheritance
