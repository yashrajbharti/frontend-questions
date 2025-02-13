function customPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new TypeError("Argument must be an array of promises");
    }

    if (promises.length === 0) {
      return resolve(); // If no promises, resolve immediately with undefined
    }

    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
}

/**
 * const promise1 = new Promise((resolve, reject) => setTimeout(() => reject('Error 1'), 500));
 * const promise2 = new Promise((resolve, reject) => setTimeout(() => resolve('Success 1'), 1000));
 * const promise3 = new Promise((resolve, reject) => setTimeout(() => reject('Error 2'), 1500));
 *
 * customPromiseRace([promise1, promise2, promise3])
 *  .then(result => console.log(result)) // Output: 'Success 1'
 *  .catch(error => console.error(error)); // This will not be reached in this example
 *
 */
