document.addEventListener("DOMContentLoaded", () => {

  // 1. CURSORE PERSONALIZZATO — versione fluida senza setTimeout
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");

  if (window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrame;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot segue istantaneamente
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Ring usa lerp in requestAnimationFrame — mai più inchiodato
    function animateCursor() {
      const ease = 0.12;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      animFrame = requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursore nascosto quando esce dalla finestra
    document.addEventListener("mouseleave", () => {
      cursorDot.style.opacity = "0";
      cursorRing.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
    });

    // Effetto hover
    const interactables = document.querySelectorAll("a, button, input, textarea, .about-card, .member-card");
    interactables.forEach(el => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  // 2. NAVBAR E MENU MOBILE
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }, { passive: true });

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    navToggle.classList.toggle("active", isOpen);
    // Blocca scroll body quando menu è aperto su mobile
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Chiudi menu al click di un link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Chiudi menu cliccando fuori
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("active") &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // 3. ANIMAZIONI ON SCROLL
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.style.getPropertyValue('--delay')) {
          entry.target.style.transitionDelay = entry.target.style.getPropertyValue('--delay');
        }
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-in, .about-card, .member-card, .timeline-item").forEach(el => {
    el.classList.add("animate-in");
    observer.observe(el);
  });

  // 4. ANIMAZIONE CONTATORI
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute("data-target");
        let count = 0;
        const speed = 200;
        const inc = target / speed;

        const updateCount = () => {
          count += inc;
          if (count < target) {
            entry.target.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            entry.target.innerText = target;
          }
        };
        updateCount();
        statsObserver.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".stat-num").forEach(stat => statsObserver.observe(stat));

  // 5. TILT 3D — solo desktop
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(el => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -10;
        const rotateY = ((x - rect.width / 2) / rect.width) * 10;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = "none";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        el.style.transition = "transform 0.5s ease";
      });
    });
  }

  // 6. FORM CONTATTI
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const successMsg = document.getElementById("formSuccess");

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }

      submitBtn.classList.add("is-loading");
      setTimeout(() => {
        submitBtn.classList.remove("is-loading");
        contactForm.reset();
        successMsg.style.display = "block";
        setTimeout(() => { successMsg.style.display = "none"; }, 5000);
      }, 1500);
    });
  }
});

// Easter egg
const EasterEggTrigger = document.getElementById('EasterEgg-trigger');
if (EasterEggTrigger) {
  let isActive = true;
  EasterEggTrigger.addEventListener('click', () => {
    if (isActive) {
      EasterEggTrigger.textContent = 'No coffee anymore =,)';
      EasterEggTrigger.classList.add('EasterEgg-active');
    } else {
      EasterEggTrigger.textContent = 'plz give us coffee';
      EasterEggTrigger.classList.remove('EasterEgg-active');
    }
    EasterEggTrigger.style.transform = 'scale(0.8)';
    setTimeout(() => {
      EasterEggTrigger.style.transform = isActive ? 'scale(1.3) rotate(10deg)' : 'scale(1)';
    }, 50);
    isActive = !isActive;
  });
}