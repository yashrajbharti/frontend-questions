// Series
async function runTasksInSeries(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}

// runTasksInSeries([task1, task2, task3]).then(console.log);
// ["Task 1 Done", "Task 2 Done", "Task 3 Done"]

// Parallel
function runTasksInParallel(tasks) {
  return Promise.allSettled(tasks.map((task) => task()));
}

// const task1 = () => new Promise((res) => setTimeout(() => res("Task 1 Done"), 1000));
// const task2 = () => new Promise((_, rej) => setTimeout(() => rej("Task 2 Failed"), 500));
// const task3 = () => new Promise((res) => setTimeout(() => res("Task 3 Done"), 700));

// runTasksInParallel([task1, task2, task3]).then(console.log);

// [
//   { status: "fulfilled", value: "Task 1 Done" },
//   { status: "rejected", reason: "Task 2 Failed" },
//   { status: "fulfilled", value: "Task 3 Done" },
// ];

// Race
function runTasksInRace(tasks) {
  return Promise.race(tasks.map((task) => task()));
}

// const task1 = () => new Promise((res) => setTimeout(() => res("Task 1 Done"), 1000));
// const task2 = () => new Promise((res) => setTimeout(() => res("Task 2 Done"), 500));
// const task3 = () => new Promise((res) => setTimeout(() => res("Task 3 Done"), 700));

// runTasksInRace([task1, task2, task3]).then(console.log);

// "Task 2 Done"
