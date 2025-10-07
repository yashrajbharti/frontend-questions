/**
 * useFetch Hook
 * 
 * Create a custom hook for data fetching with loading and error states.
 * This hook handles the common pattern of fetching data in React components.
 * 
 * @param {string} url - The URL to fetch from
 * @param {Object} options - Optional fetch options
 * @returns {Object} - Returns { data, loading, error, refetch }
 */

import { useState, useEffect, useCallback } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Example usage:
function UserList() {
  const { data, loading, error, refetch } = useFetch('https://api.example.com/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {data?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// With options
function PostData() {
  const { data, loading, error } = useFetch('https://api.example.com/post/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return <div>{loading ? 'Loading...' : JSON.stringify(data)}</div>;
}

export default useFetch;
