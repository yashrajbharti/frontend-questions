async function runSequentially(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}

// Example Usage
runSequentially([task1, task2, task3]).then(console.log);
