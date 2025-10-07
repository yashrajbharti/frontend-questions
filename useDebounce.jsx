/**
 * useDebounce Hook
 * 
 * Create a custom hook that debounces a value. The debounced value will only
 * reflect the latest value when the hook hasn't been called for the specified delay period.
 * 
 * Useful for search inputs, window resize handlers, etc.
 * 
 * @param {*} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {*} - The debounced value
 */

import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if value changes before delay expires
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Example usage: Search with debounce
function SearchBox() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      // This will only run 500ms after the user stops typing
      console.log('Searching for:', debouncedSearchTerm);
      // performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <p>Immediate value: {searchTerm}</p>
      <p>Debounced value: {debouncedSearchTerm}</p>
    </div>
  );
}

export default useDebounce;
