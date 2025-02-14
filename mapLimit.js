function mapLimit(tasks, limit, iteratorFn) {
  return new Promise((resolve, reject) => {
    let index = 0; // Tracks the next task to process
    let activeCount = 0; // Number of active tasks
    let results = new Array(tasks.length); // Store results

    function next() {
      if (index >= tasks.length && activeCount === 0) {
        return resolve(results); // All tasks complete
      }

      while (activeCount < limit && index < tasks.length) {
        const taskIndex = index++;
        activeCount++;

        Promise.resolve(iteratorFn(tasks[taskIndex], taskIndex))
          .then((result) => {
            results[taskIndex] = result;
          })
          .catch(reject)
          .finally(() => {
            activeCount--;
            next(); // Trigger the next task when one completes
          });
      }
    }

    next(); // Start processing
  });
}

// const delayTask = (value, delay) =>
//   new Promise((resolve) => setTimeout(() => resolve(value), delay));

// const tasks = [1, 2, 3, 4, 5];
// const iteratorFn = (val) => delayTask(val * 10, val * 500);

// mapLimit(tasks, 2, iteratorFn).then(console.log);

// // Expected Output (in order of completion)
// // After 500ms -> [10, 20]
// // After 1000ms -> [30]
// // After 1500ms -> [40]
// // After 2000ms -> [50]
// // Final Output: [10, 20, 30, 40, 50]
