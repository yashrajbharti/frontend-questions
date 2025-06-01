{
  // HTML and CSS
  /* <img
  class="lazy-image"
  data-src="https://example.com/image.jpg"
  alt="Lazy loaded image"
  width="600"
  height="400"
/>;
<style>
.lazy-image {
  filter: blur(10px);
  transition: filter 0.3s ease;
}
.lazy-image:not([data-src]) {
  filter: blur(0);
}
</style> */
}

document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazy-image");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute("data-src");

            if (src) {
              img.src = src;
              img.removeAttribute("data-src");
            }

            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "100px", // preload before it enters the screen
        threshold: 0.1,
      }
    );

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback: load all images immediately
    lazyImages.forEach((img) => {
      const src = img.getAttribute("data-src");
      if (src) {
        img.src = src;
        img.removeAttribute("data-src");
      }
    });
  }
});
