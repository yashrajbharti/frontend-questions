// React components can re-render for various reasons, and unnecessary re-renders can hurt performance. Here’s how to avoid them:
const Component = React.memo((props) => {
  // Your component code
  return <div>{props.value}</div>;
});

// Code splitting
const MyComponent = React.lazy(() => import("./MyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}

const handleClick = useCallback(() => {
  console.log("Button clicked!");
}, []); // Empty dependency array means the function is memoized.

// Batch Updates
import { flushSync } from "react-dom";

// Example of manual batching
flushSync(() => {
  setState1(value1);
  setState2(value2);
});

// Use useMemo for Expensive Calculations

import { useMemo } from "react";

function ExpensiveComponent({ number }) {
  const computedValue = useMemo(() => {
    console.log("Expensive calculation");
    return number * 2;
  }, [number]); // Only recalculates when 'number' changes

  return <div>{computedValue}</div>;
}

// Use useCallback to Prevent Function Re-creation

import { useCallback } from "react";

function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []); // Only re-create if dependencies change

  return <ChildComponent onClick={handleClick} />;
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}
