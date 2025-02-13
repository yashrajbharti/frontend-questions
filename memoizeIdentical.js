function memoizedFetch() {
  const cache = new Map(); // Stores API responses

  return async function fetchWithCache(url, options = {}) {
    const cacheKey = `${url}:${JSON.stringify(options)}`; // Unique key for caching

    if (cache.has(cacheKey)) {
      console.log("Returning cached response:", url);
      return cache.get(cacheKey); // Return cached data
    }

    console.log("Fetching from API:", url);
    const response = await fetch(url, options);
    const data = await response.json();

    cache.set(cacheKey, data); // Store response in cache
    return data;
  };
}

// Create a memoized instance
const fetchAPI = memoizedFetch();

// (async () => {
//   const URL = "https://jsonplaceholder.typicode.com/posts/1";

//   // First request - makes an actual API call
//   const data1 = await fetchAPI(URL);
//   console.log(data1);

//   // Second request - returns cached response
//   const data2 = await fetchAPI(URL);
//   console.log(data2);

//   // Changing the URL will trigger a new fetch
//   const data3 = await fetchAPI("https://jsonplaceholder.typicode.com/posts/2");
//   console.log(data3);
// })();

// OUTPUT
// Fetching from API: https://jsonplaceholder.typicode.com/posts/1
// { userId: 1, id: 1, title: "...", body: "..." }

// Returning cached response: https://jsonplaceholder.typicode.com/posts/1
// { userId: 1, id: 1, title: "...", body: "..." }

// Fetching from API: https://jsonplaceholder.typicode.com/posts/2
// { userId: 1, id: 2, title: "...", body: "..." }
