(function detectLayoutThrashing() {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  Element.prototype.getBoundingClientRect = function () {
    console.warn(
      "[Layout Thrashing] Detected layout read: getBoundingClientRect"
    );
    return originalGetBoundingClientRect.call(this);
  };

  const originalStyle = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "style"
  );
  Object.defineProperty(HTMLElement.prototype, "style", {
    get() {
      console.warn("[Layout Thrashing] Detected style write");
      return originalStyle.get.call(this);
    },
  });
})();
