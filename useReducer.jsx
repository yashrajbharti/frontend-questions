/**
 * Custom useReducer Hook Implementation
 * 
 * Implement a custom version of React's useReducer hook.
 * useReducer is an alternative to useState for managing complex state logic.
 * 
 * @param {Function} reducer - A function that takes (state, action) and returns new state
 * @param {*} initialState - The initial state value
 * @param {Function} init - Optional lazy initializer function
 * @returns {Array} - Returns [state, dispatch] tuple
 */

import { useState, useCallback } from 'react';

function useReducer(reducer, initialState, init) {
  // Initialize state with lazy initialization support
  const [state, setState] = useState(() => {
    return init ? init(initialState) : initialState;
  });

  // Create dispatch function that applies reducer logic
  const dispatch = useCallback((action) => {
    setState(prevState => reducer(prevState, action));
  }, [reducer]);

  return [state, dispatch];
}

// Example usage:
// Counter with reducer
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

export default useReducer;
