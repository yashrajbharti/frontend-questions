const letters = ["a", "b", "c", "d", "e"];
const proxy = new Proxy(letters, {
  get(target, prop) {
    prop = Number(prop);
    if (prop < 0) {
      prop += target.length;
    }
    return target[prop];
  },
});

/**
 * console.log(proxy[0]); // Output: 'a'
 * console.log(proxy[-1]); // Output: 'e' (last element)
 * console.log(proxy[-2]); // Output: 'd' (second-to-last element)
 */
