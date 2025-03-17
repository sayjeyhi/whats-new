console.log("SW loaded");

self.addEventListener("fetch", (event) => {
  console.log("SW fetch event", event);
});
