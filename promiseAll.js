function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed += 1;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

/**
 *  const promise1 = Promise.resolve(1);
 *  const promise2 = Promise.resolve(2);
 *  const promise3 = new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000));
 *  const promise4 = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Failed')), 500));
 *
 *  customPromiseAll([promise1, promise2, promise3])
 *    .then(results => console.log(results)) // Output: [1, 2, 3]
 *    .catch(error => console.error(error));
 *
 *  customPromiseAll([promise1, promise2, promise4])
 *    .then(results => console.log(results))
 *    .catch(error => console.error(error)); // Output: Error: Failed
 */
