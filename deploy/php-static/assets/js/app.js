(function () {
  const header = document.getElementById("site-header");
  const isHome = document.body.dataset.page === "home";

  if (header && isHome) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  } else if (header) {
    header.classList.add("is-scrolled");
  }

  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      const open = drawer.hasAttribute("hidden");
      if (open) {
        drawer.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
      } else {
        drawer.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots button");
  if (slides.length > 1) {
    let idx = 0;
    const show = (i) => {
      slides.forEach((s, n) => s.classList.toggle("is-active", n === i));
      dots.forEach((d, n) => d.classList.toggle("is-active", n === i));
      idx = i;
    };
    dots.forEach((btn, i) => btn.addEventListener("click", () => show(i)));
    setInterval(() => show((idx + 1) % slides.length), 7000);
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const form = document.getElementById("contact-form");
  if (form) {
    const showError = (field, msg) => {
      const el = form.querySelector(`[data-error-for="${field}"]`);
      if (el) {
        el.textContent = msg;
        el.classList.add("visible");
      }
    };
    const clearErrors = () => {
      form.querySelectorAll(".form-error").forEach((el) => {
        el.textContent = "";
        el.classList.remove("visible");
      });
    };
    form.addEventListener("submit", async (event) => {
      clearErrors();
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');
      let valid = true;
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
        return;
      }
      if (form.dataset.ajax !== "1") return;
      event.preventDefault();
      const flash = document.getElementById("form-flash");
      const fd = new FormData(form);
      try {
        const res = await fetch(form.action, { method: "POST", body: fd, headers: { Accept: "application/json" } });
        const data = await res.json();
        if (flash) {
          flash.className = "flash " + (data.ok ? "ok" : "err");
          flash.textContent = data.message || (data.ok ? "Message sent." : "Could not send.");
          flash.hidden = false;
        }
        if (data.ok) form.reset();
      } catch {
        if (flash) {
          flash.className = "flash err";
          flash.textContent = "Network error — please call or email us directly.";
          flash.hidden = false;
        }
      }
    });
  }
})();
