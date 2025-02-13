function customPromiseAllSettled(promises) {
  return new Promise((resolve) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          completed += 1;
          if (completed === promises.length) {
            resolve(results);
          }
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
 *  customPromiseAllSettled([promise1, promise2, promise3, promise4])
 *    .then(results => console.log(results));
 *    // Output:
 *    // [
 *    //   { status: 'fulfilled', value: 1 },
 *    //   { status: 'fulfilled', value: 2 },
 *    //   { status: 'fulfilled', value: 3 },
 *    //   { status: 'rejected', reason: Error: Failed }
 *    // ]
 */
