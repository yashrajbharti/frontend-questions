function doHeavyNonCriticalWork() {
  // simulate work
  console.log("Doing non-critical work...");
  for (let i = 0; i < 1000000; i++) {}
}

if ("requestIdleCallback" in window) {
  requestIdleCallback((deadline) => {
    while (deadline.timeRemaining() > 0 && !taskDone) {
      doHeavyNonCriticalWork();
      taskDone = true;
    }
  });
} else {
  // Fallback for older browsers
  setTimeout(() => doHeavyNonCriticalWork(), 0);
}
