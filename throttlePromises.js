function throttlePromises(funcs, max) {
  let result = [];
  if (!funcs || funcs.length === 0) return Promise.resolve(result);

  // Create and execute each batch of promises recursively
  const createBatch = (batchId, resolve, reject) => {
    const startIdx = batchId * max;
    const batchedFuncs = funcs.slice(startIdx, startIdx + max); // Select batch

    if (batchedFuncs.length === 0) {
      // Base case: No more functions to process
      return resolve(result);
    }

    // Execute current batch and process results
    Promise.all(batchedFuncs.map((fn) => fn()))
      .then((batchedData) => {
        result.push(...batchedData);
        createBatch(batchId + 1, resolve, reject); // Process next batch
      })
      .catch((err) => reject(err)); // Handle errors
  };

  // Return promise chain that starts the batching process
  return new Promise((resolve, reject) => createBatch(0, resolve, reject));
}

/**
 * const asyncTask = (id) => () => new Promise(resolve => setTimeout(() => resolve(`Task ${id} done`), 1000));
 *
 * const tasks = Array.from({ length: 10 }, (_, i) => asyncTask(i + 1));
 *
 * // Throttle with a maximum of 3 tasks running concurrently
 * throttlePromises(tasks, 3).then(result => {
 *   console.log('All tasks done:', result);
 * }).catch(error => {
 *   console.error('Error:', error);
 * });
 */
