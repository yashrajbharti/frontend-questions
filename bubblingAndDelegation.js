// Delegation
document.getElementById("parent").addEventListener("click", (event) => {
  if (event.target.matches(".child")) {
    console.log("Child Clicked:", event.target.textContent);
  }
});

// Capturing
document.getElementById("parent").addEventListener(
  "click",
  () => {
    console.log("Captured at Parent");
  },
  true // Capturing mode enabled
);
// Capturing happens before bubbling and is process to reach the target element
// The event starts at the root and moves down to the target element.

// Bubbling
document.getElementById("child").addEventListener("click", () => {
  console.log("Child Clicked");
});

document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent Clicked (Bubbling)");
});
// The event starts at the target element and bubbles up through its ancestors.
