import React, { Profiler } from "react";

const onRenderCallback = (id, phase, actualDuration, baseDuration) => {
  console.log(`Component: ${id}`);
  console.log(`Phase: ${phase}`); // "mount" or "update"
  console.log(`Actual Duration: ${actualDuration}ms`); // Time spent rendering
  console.log(`Base Duration: ${baseDuration}ms`); // Ideal duration (without memoization)
};

export default function App() {
  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
}

/*
🔍 React Profiler: Measuring Performance in React Apps 🚀

What is React Profiler?
The React Profiler is a tool that helps developers measure performance bottlenecks in their React applications by tracking component renders and their costs.

It allows you to: ✔ Identify slow renders
✔ Measure how long a component takes to render
✔ Detect unnecessary re-renders
✔ Optimize expensive computations

🔎 How to Use React Profiler?

1️⃣ Using React DevTools Profiler
📌 Steps to enable React Profiler:

Install React DevTools (if not installed)
🔗 Chrome Extension
Open DevTools → Profiler Tab
Click Record → Interact with your app
Click Stop Recording to analyze performance
✅ It will show flame graphs with:

Re-render durations (highlighted in different colors)
What triggered the re-renders?
2️⃣ Using the <Profiler> Component in Code
React provides a <Profiler> component that logs performance metrics.
*/
