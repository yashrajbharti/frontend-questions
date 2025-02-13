const memoize = (fn) => {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// const slowSquare = (n) => {
//     console.log(`Computing square of ${n}...`);
//     return n * n;
//   };

//   const memoizedSquare = memoize(slowSquare);

//   console.log(memoizedSquare(4)); // Computing square of 4... → 16
//   console.log(memoizedSquare(4)); // Cached → 16
//   console.log(memoizedSquare(5)); // Computing square of 5... → 25
//   console.log(memoizedSquare(5)); // Cached → 25
