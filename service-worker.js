// app.js

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((reg) => console.log("Service Worker registered!", reg))
    .catch((err) => console.error("Service Worker registration failed:", err));
}

// ./service-worker.js

const CACHE_NAME = "my-cache-v1";
const urlsToCache = ["/", "/index.html", "/styles.css", "/script.js"];

// Install event - caches files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serves cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event - clears old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cache) => cache !== CACHE_NAME)
          .map((cache) => caches.delete(cache))
      );
    })
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(fetch("/sync-endpoint", { method: "POST" }));
  }
});

self.addEventListener("push", (event) => {
  self.registration.showNotification("New Message!", {
    body: "You have a new notification!",
    icon: "/icon.png",
  });
});
