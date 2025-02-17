import React, { useState } from "react";

const Button = React.memo(({ onClick }) => {
  console.log("Button Rendered!"); // Will only log when necessary
  return <button onClick={onClick}>Click Me</button>;
});

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Button onClick={() => console.log("Button clicked!")} />
    </div>
  );
};

// 2️⃣ useMemo() – Memoizing Computed Values

// 🔹 useMemo() caches the result of expensive calculations and only recompute

import { useState, useMemo } from "react";

const ExpensiveComponent = ({ num }) => {
  const squaredNumber = useMemo(() => {
    console.log("Calculating...");
    return num * num;
  }, [num]); // Only recalculates if `num` changes

  return <p>Squared Number: {squaredNumber}</p>;
};

const AppExample = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(5);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <ExpensiveComponent num={num} />
      <button onClick={() => setNum(num + 1)}>Change Number</button>
    </div>
  );
};

