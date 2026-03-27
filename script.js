document.addEventListener("DOMContentLoaded", () => {
  
  // 1. CURSORE PERSONALIZZATO
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  
  // Se non siamo su dispositivo touch
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Aggiorna posizione dot e ring
      cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
      
      // Aggiungiamo un po' di ritardo al ring per l'effetto "follower"
      setTimeout(() => {
        cursorRing.style.transform = `translate(${posX}px, ${posY}px)`;
      }, 50);
    });

    // Effetto hover su link e bottoni
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
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Chiudi menu quando si clicca un link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // 3. ANIMAZIONI ON SCROLL (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Aggiungi delay dinamico se specificato nell'HTML
        if(entry.target.style.getPropertyValue('--delay')) {
          entry.target.style.transitionDelay = entry.target.style.getPropertyValue('--delay');
        }
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-in, .about-card, .member-card, .timeline-item").forEach(el => {
    el.classList.add("animate-in"); // Forza classe base
    observer.observe(el);
  });

  // 4. ANIMAZIONE CONTATORI (Stats Hero)
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute("data-target");
        let count = 0;
        const speed = 200; // Regola la velocità
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

  // 5. EFFETTO TILT 3D SULLE CARD
  const tiltElements = document.querySelectorAll("[data-tilt]");
  
  if (window.matchMedia("(pointer: fine)").matches) {
    tiltElements.forEach(el => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotazione 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.transition = "none";
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        el.style.transition = "transform 0.5s ease";
      });
    });
  }

  // 6. GESTIONE FORM CONTATTI SIMULATA
  const contactForm = document.getElementById("contactForm");
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const successMsg = document.getElementById("formSuccess");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita il ricaricamento
    
    // Controlla la validità dei campi HTML5
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    submitBtn.classList.add("is-loading");
    
    // Simula invio dati (es. Fetch API verso un backend)
    setTimeout(() => {
      submitBtn.classList.remove("is-loading");
      contactForm.reset();
      successMsg.style.display = "block";
      
      // Nascondi il messaggio dopo 5 secondi
      setTimeout(() => {
        successMsg.style.display = "none";
      }, 5000);
    }, 1500);
  });
});


//Easster egg
const EasterEggTrigger = document.getElementById('EasterEgg-trigger');
let isActive = true;

EasterEggTrigger.addEventListener('click', () => {
  if (isActive) {
    EasterEggTrigger.textContent = 'No bitches anymore =,)';
    EasterEggTrigger.classList.add('EasterEgg-active');
  } else {
    EasterEggTrigger.textContent = 'No bitches?';
    EasterEggTrigger.classList.remove('EasterEgg-active');
  }
  
  // Piccolo effetto "pop" extra via JS
  EasterEggTrigger.style.transform = 'scale(0.8)';
  setTimeout(() => {
    EasterEggTrigger.style.transform = isActive ? 'scale(1.3) rotate(10deg)' : 'scale(1)';
  }, 50);

  isActive = !isActive;
});