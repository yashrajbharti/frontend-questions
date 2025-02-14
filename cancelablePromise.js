function createCancelablePromise(executor) {
  let isCanceled = false;

  const promise = new Promise((resolve, reject) => {
    executor(
      (value) => (isCanceled ? reject({ canceled: true }) : resolve(value)),
      (error) => (isCanceled ? reject({ canceled: true }) : reject(error))
    );
  });

  return {
    promise,
    cancel() {
      isCanceled = true;
    },
  };
}

// const delayedPromise = createCancelablePromise((resolve, reject) => {
//   setTimeout(() => resolve("Task Completed!"), 3000);
// });

// delayedPromise.promise
//   .then(console.log)
//   .catch((err) => console.log(err.canceled ? "Promise was canceled!" : err));

// // Cancel the promise after 1 second
// setTimeout(() => {
//   delayedPromise.cancel();
// }, 1000);
