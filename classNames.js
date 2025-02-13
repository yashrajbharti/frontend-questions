function classNames(...args) {
  let classList = [];
  const filteredArgs = args.flat(Infinity).filter(Boolean);

  for (let arg of filteredArgs) {
    if (typeof arg === "string") {
      classList.push(arg);
    } else if (typeof arg === "object") {
      for (let key in arg) {
        if (arg[key]) classList.push(key);
      }
    }
  }

  return classList.join(" ");
}

// Usage Examples
console.log(classNames("btn", "primary")); // "btn primary"
console.log(classNames("btn", { active: true, disabled: false })); // "btn active"
console.log(classNames(["btn", ["large", "rounded"]])); // "btn large rounded"
console.log(classNames("btn", null, "", undefined, false, 0, "hover")); // "btn hover"
