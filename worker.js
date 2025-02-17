// app.js

// Create a new Web Worker
const worker = new Worker("worker.js");

// Send data to the worker
worker.postMessage({ task: "start", data: [1, 2, 3, 4] });

// Listen for messages from the worker
worker.onmessage = function (event) {
  console.log("Result from worker:", event.data);
};

// Handle worker errors
worker.onerror = function (error) {
  console.error("Worker error:", error.message);
};

// worker.js

// Listen for messages from the main thread
onmessage = function (event) {
  const { task, data } = event.data;

  if (task === "start") {
    // Perform a time-consuming task (e.g., data processing)
    const result = data.map((num) => num * 2);

    // Send the result back to the main thread
    postMessage(result);
  }
};

// Main thread
worker.postMessage({ task: "start" });
worker.onmessage = (event) => {
  console.log("Worker response:", event.data);
};

// Worker thread
onmessage = (e) => {
  // Process task
  postMessage("Task complete");
};

const sharedBuffer = new SharedArrayBuffer(1024);
const uint8Array = new Uint8Array(sharedBuffer);

// Main thread writes to the shared buffer
uint8Array[0] = 42;

// Worker reads from the shared buffer
worker.postMessage(sharedBuffer);

// Main thread: terminate the worker
worker.terminate();

// Worker: self-terminate
self.close();
