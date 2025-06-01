{
  /* <button id="openModalBtn">Open Modal</button>

<div id="modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-hidden="true">
  <div class="modal-content">
    <h2 id="modalTitle">Modal Title</h2>
    <p>Modal content goes here.</p>
    <button>Action</button>
    <button id="closeModalBtn">Close</button>
  </div>
</div>

.modal {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
}
.modal[aria-hidden="false"] {
  display: flex;
}
.modal-content {
  background: white;
  padding: 1rem;
  max-width: 400px;
  border-radius: 8px;
} */
}

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("modal");
  let lastFocusedElement;

  const focusableSelectors =
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(focusableSelectors);
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    modal.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          // Tab
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      if (e.key === "Escape") {
        closeModal();
      }
    });
  }

  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.setAttribute("aria-hidden", "false");
    trapFocus(modal);
    const firstFocusable = modal.querySelector(focusableSelectors);
    firstFocusable?.focus();
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    lastFocusedElement?.focus();
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
});
