(function () {
  const navInner = document.querySelector(".nav-inner");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && navInner) {
    toggle.addEventListener("click", () => {
      const open = navInner.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const form = document.getElementById("contact-form");
  if (!form) return;

  const showError = (field, message) => {
    const el = form.querySelector(`[data-error-for="${field}"]`);
    if (el) {
      el.textContent = message;
      el.classList.add("visible");
    }
  };

  const clearErrors = () => {
    form.querySelectorAll(".form-error").forEach((el) => {
      el.textContent = "";
      el.classList.remove("visible");
    });
  };

  form.addEventListener("submit", (event) => {
    clearErrors();
    let valid = true;

    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    if (!name?.value.trim()) {
      showError("name", "Please enter your name.");
      valid = false;
    }
    if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError("email", "Please enter a valid email.");
      valid = false;
    }
    if (!message?.value.trim() || message.value.trim().length < 10) {
      showError("message", "Please enter at least 10 characters.");
      valid = false;
    }

    if (!valid) {
      event.preventDefault();
    }
  });
})();
