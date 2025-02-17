import React, { useState } from "react";

const Counter = React.memo(({ count }) => {
  console.log("Counter re-rendered!");
  return <h1>{count}</h1>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div>
      <Counter count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

/*
Reconciliation in React 🚀
Reconciliation is the process React uses to efficiently update the UI when the state or props change. Instead of re-rendering the entire UI, React compares the previous and new Virtual DOM trees and updates only the necessary parts in the actual DOM. This makes updates fast and efficient.

1️⃣ The Virtual DOM & Diffing Algorithm
React uses a Virtual DOM (VDOM) to optimize UI updates. When the state changes:

A new Virtual DOM tree is created.
React compares the new tree with the previous one (diffing).
React calculates the minimum changes needed.
It updates only the changed parts in the real DOM.
This process is called Reconciliation.


2️⃣ How React Diffing Algorithm Works?
React follows two optimization rules to speed up updates:

🔹 Rule 1: Element Type Changes → Full Re-render

If React sees a change in an element type, it will destroy the old element and create a new one.

<div> Hello </div>   →   <p> Hello </p>

 Rule 2: Key Prop Helps Efficient List Updates

When rendering lists, React relies on keys to track elements. ✅ Correct usage with keys:

{items.map((item) => (
  <li key={item.id}>{item.name}</li>
))}
❌ Bad practice (index as key):

{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}

3️⃣ Steps in Reconciliation
Render Phase:
React calls the component functions and generates a new Virtual DOM tree.
It compares (diffing) the new Virtual DOM with the old one.
Commit Phase:
React calculates minimal changes.
It updates the real DOM efficiently.
4️⃣ When Does Reconciliation Happen?
State changes (setState): React updates only the affected parts.
Prop changes: If props change, React re-renders the component.
Force update (forceUpdate()): Triggers reconciliation forcefully.
*/
