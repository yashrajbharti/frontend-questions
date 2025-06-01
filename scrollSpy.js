{
  /* <nav id="navbar">
  <a href="#section1" id="link-section1">Section 1</a>
  <a href="#section2" id="link-section2">Section 2</a>
  <a href="#section3" id="link-section3">Section 3</a>
</nav>

<main>
  <section id="section1" class="spy-section">Section 1 Content</section>
  <section id="section2" class="spy-section">Section 2 Content</section>
  <section id="section3" class="spy-section">Section 3 Content</section>
</main>

#navbar a.active {
  font-weight: bold;
  color: red;
}
.spy-section {
  height: 100vh;
  padding: 20px;
  border-bottom: 1px solid #ccc;
} */
}

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".spy-section");
  const navLinks = document.querySelectorAll("#navbar a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`#navbar a[href="#${id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -70% 0px", // Trigger earlier
      threshold: 0.1,
    }
  );

  sections.forEach((section) => observer.observe(section));
});
