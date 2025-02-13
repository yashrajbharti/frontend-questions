function customPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let rejectedCount = 0;
    const totalPromises = promises.length;

    if (totalPromises === 0) {
      return reject(new AggregateError([], "No promises provided"));
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          resolve(value);
        })
        .catch((error) => {
          errors[index] = error;
          rejectedCount += 1;
          if (rejectedCount === totalPromises) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}
/**
 * const promise1 = Promise.reject("Error 1");
 * const promise2 = Promise.reject("Error 2");
 * const promise3 = new Promise((resolve, reject) =>
 *  setTimeout(() => resolve("Success"), 1000)
 * );
 * const promise4 = Promise.reject("Error 3");
 *
 * customPromiseAny([promise1, promise2, promise3, promise4])
 *  .then((result) => console.log(result)) // Output: 'Success'
 *  .catch((error) => console.error(error));
 *
 * customPromiseAny([promise1, promise2, promise4])
 *  .then((result) => console.log(result))
 *  .catch((error) => console.error(error)); // Output: AggregateError with errors from promise1, promise2, and promise4
 */
