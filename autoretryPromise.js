function fetchWithAutoRetry(fetcher, maximumRetryCount, delay = 1000) {
  return new Promise((resolve, reject) => {
    let retryCount = 0;

    const callFetcher = () => {
      fetcher()
        .then((data) => resolve(data))
        .catch((error) => {
          if (retryCount < maximumRetryCount) {
            retryCount += 1;
            setTimeout(callFetcher, delay);
          } else {
            reject(error);
          }
        });
    };

    callFetcher();
  });
}

/**
 * const unreliableFetch = () => {
 *   return new Promise((resolve, reject) => {
 *     // Simulate a fetch operation that fails randomly
 *     Math.random() > 0.5
 *       ? resolve("Data fetched successfully")
 *       : reject("Fetch failed");
 *   });
 * };
 *
 * fetchWithAutoRetry(unreliableFetch, 3, 1000)
 *   .then((result) => console.log(result)) // Output: 'Data fetched successfully' or 'Fetch failed' after retries
 *   .catch((err) => console.error(err)); // Handle the final error after all retries
 */
