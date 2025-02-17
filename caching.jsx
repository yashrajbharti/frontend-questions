import React, { useState, useEffect } from "react";

const cache = new Map();

const fetchData = async (url) => {
  // Check if data is in cache
  if (cache.has(url)) {
    console.log("Serving from cache");
    return cache.get(url);
  }

  // Fetch data from API if not in cache
  const response = await fetch(url);
  const data = await response.json();

  // Store the data in cache
  cache.set(url, data);
  return data;
};

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData("https://api.example.com/data");
      setData(result);
    };

    loadData();
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default MyComponent;
