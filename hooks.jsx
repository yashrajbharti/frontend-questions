import { useState, useRef, useMemo, useEffect, useCallback } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};

// 2️⃣ Commonly Used Hooks

// 🔹 useState() – Managing State

const CounterExample = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// 🔹 useEffect() – Side Effects & Lifecycle Methods
// The useEffect hook is used for side effects (API calls, subscriptions, DOM updates).

// Example: Fetch API on Component Mount

const DataFetcher = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []); // Empty array → Runs only once (componentDidMount)

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

// 🔹 useRef() – Accessing DOM & Keeping Persistent Values
// The useRef hook:

// Gets a reference to a DOM element.
// Stores values without causing re-renders.

const FocusInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Auto-focus input
  }, []);

  return <input ref={inputRef} placeholder="Type here..." />;
};

// 🔹 useMemo() – Optimizing Performance
// Prevents expensive calculations from running on every render.

const ExpensiveCalculation = ({ num }) => {
  const computedValue = useMemo(() => {
    console.log("Calculating...");
    return num * 2;
  }, [num]); // Runs only when `num` changes

  return <p>Computed Value: {computedValue}</p>;
};

// 🔹 useCallback() – Memoizing Functions
// Prevents unnecessary re-creation of functions.

// Example: Prevent Re-renders in Child Components

const Button = ({ onClick }) => {
  console.log("Button re-rendered!");
  return <button onClick={onClick}>Click Me</button>;
};

const MemoizedButton = React.memo(Button); // Prevents re-render

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []); // Stays the same across renders

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MemoizedButton onClick={handleClick} />
    </div>
  );
};

// Custom Hooks
// You can create your own Hooks for reusable logic.

// Example: useFetch Hook

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
};

// Usage:
const AppCustom = () => {
  // This is a CUSTOM hook
  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  return loading ? (
    <p>Loading...</p>
  ) : (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
};
