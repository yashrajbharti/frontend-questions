Promise.prototype.customFinally = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const promise = this;

  return new Promise((resolve, reject) => {
    promise.then(
      (value) => {
        Promise.resolve(callback()).finally(() => resolve(value));
      },
      (reason) => {
        Promise.resolve(callback()).finally(() => reject(reason));
      }
    );
  });
};

/**
 * const promise1 = new Promise((resolve, reject) =>
 * setTimeout(() => resolve("Success"), 1000)
 * );
 *
 * promise1
 *  .customFinally(() => {
 *    console.log("Cleanup or final actions here");
 *  })
 *  .then((result) => console.log(result)) // Output: 'Success'
 *  .catch((error) => console.error(error)); // Not used in this case
 *
 */
