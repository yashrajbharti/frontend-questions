/**
 * usePrevious Hook
 * 
 * Create a custom hook that stores the previous value of a prop or state.
 * This is useful for comparing current and previous values in effects.
 * 
 * @param {*} value - The current value to track
 * @returns {*} - The previous value
 */

import { useRef, useEffect } from 'react';

function usePrevious(value) {
  // Create a ref to store the previous value
  const ref = useRef();

  // Update the ref after each render
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the previous value (before the update in the effect)
  return ref.current;
}

// Example usage:
function Counter() {
  const [count, setCount] = React.useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Advanced usage with comparison
function UserProfile({ userId }) {
  const [user, setUser] = React.useState(null);
  const prevUserId = usePrevious(userId);

  React.useEffect(() => {
    // Only fetch if userId changed
    if (userId !== prevUserId) {
      fetchUser(userId).then(setUser);
    }
  }, [userId, prevUserId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}

export default usePrevious;
