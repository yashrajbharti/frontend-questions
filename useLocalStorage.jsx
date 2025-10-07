/**
 * useLocalStorage Hook
 * 
 * Create a custom hook that syncs state with localStorage.
 * This hook provides a way to persist state across page reloads.
 * 
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value if no value exists in localStorage
 * @returns {Array} - Returns [storedValue, setValue] tuple
 */

import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Example usage:
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  );
}

// Form with persistent state
function PersistentForm() {
  const [name, setName] = useLocalStorage('form-name', '');
  const [email, setEmail] = useLocalStorage('form-email', '');

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}

export default useLocalStorage;
