// Prevent Memory leaks

import { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    const handleResize = () => {
      console.log("Window resized");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup event listener when component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div>Resize the window</div>;
}

// Remove interval when component unmounts

import { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Interval running");
    }, 1000);

    return () => {
      clearInterval(timer); // Cleanup when the component unmounts
    };
  }, []);

  return <div>Interval running</div>;
}

// AbortController

import { useState, useEffect } from "react";

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data", {
          signal,
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error", error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cleanup fetch request on unmount
    };
  }, []);

  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}
