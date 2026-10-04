/* =========================================================
   TAMIN GROUP — PREMIUM INTERACTION SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const header = document.getElementById("siteHeader");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const mobileLinks =
    document.querySelectorAll(".mobile-menu a");

  const revealElements =
    document.querySelectorAll(".reveal");

  const year =
    document.getElementById("year");


  /* =========================================================
     YEAR
  ========================================================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================================
     HEADER — GLASS EFFECT ON SCROLL
  ========================================================= */

  const handleHeader = () => {

    if (window.scrollY > 35) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  handleHeader();

  window.addEventListener(
    "scroll",
    handleHeader,
    { passive: true }
  );


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const openMenu = () => {

    mobileMenu.classList.add("active");

    body.classList.add("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Close menu"
    );

  };


  const closeMenu = () => {

    mobileMenu.classList.remove("active");

    body.classList.remove("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open menu"
    );

  };


  if (menuButton) {

    menuButton.addEventListener("click", () => {

      if (
        mobileMenu.classList.contains("active")
      ) {

        closeMenu();

      } else {

        openMenu();

      }

    });

  }


  mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

      closeMenu();

    });

  });


  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  /* =========================================================
     REVEAL ANIMATIONS
  ========================================================= */

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );


  revealElements.forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );


  /* =========================================================
     STAGGER — DIRECTIONS
  ========================================================= */

  const directionCards =
    document.querySelectorAll(
      ".direction-card"
    );

  directionCards.forEach(
    (card, index) => {

      card.style.transitionDelay =
        `${index * 80}ms`;

    }
  );


  /* =========================================================
     STAGGER — PROJECTS
  ========================================================= */

  const projects =
    document.querySelectorAll(
      ".project"
    );

  projects.forEach(
    (project, index) => {

      project.style.transitionDelay =
        `${index * 100}ms`;

    }
  );


  /* =========================================================
     SMOOTH ANCHOR SCROLL
  ========================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const id =
          link.getAttribute("href");

        const target =
          document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
          header
            ? header.offsetHeight
            : 70;

        const position =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({

          top: position,

          behavior: "smooth"

        });

      }
    );

  });


  /* =========================================================
     HERO — MOUSE PARALLAX
  ========================================================= */

  const hero =
    document.querySelector(".hero");

  const orbit =
    document.querySelector(
      ".hero-orbit"
    );

  const heroTitle =
    document.querySelector(
      ".hero-title"
    );


  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (
    hero &&
    finePointer
  ) {

    hero.addEventListener(
      "mousemove",
      event => {

        const x =
          event.clientX /
          window.innerWidth -
          0.5;

        const y =
          event.clientY /
          window.innerHeight -
          0.5;


        if (orbit) {

          orbit.style.transform =
            `
            translate(
              ${x * 22}px,
              ${y * 22}px
            )
            rotate(-20deg)
            `;

        }


        if (heroTitle) {

          heroTitle.style.transform =
            `
            translate(
              ${x * -5}px,
              ${y * -5}px
            )
            `;

        }

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        if (orbit) {

          orbit.style.transform =
            "translate(0,0) rotate(-20deg)";

        }

        if (heroTitle) {

          heroTitle.style.transform =
            "translate(0,0)";

        }

      }
    );

  }


  /* =========================================================
     GLOBAL CURSOR GLOW
  ========================================================= */

  if (finePointer) {

    const cursorGlow =
      document.createElement("div");

    cursorGlow.className =
      "cursor-glow";

    document.body.appendChild(
      cursorGlow
    );


    const glowStyle =
      document.createElement("style");

    glowStyle.textContent = `

      .cursor-glow {

        position: fixed;

        width: 280px;
        height: 280px;

        border-radius: 50%;

        pointer-events: none;

        z-index: 0;

        background:
          radial-gradient(
            circle,
            rgba(216,196,155,0.065),
            transparent 68%
          );

        transform:
          translate(-50%, -50%);

        opacity: 0;

        transition:
          opacity 0.4s ease;

      }

      body:hover .cursor-glow {
        opacity: 1;
      }

    `;

    document.head.appendChild(
      glowStyle
    );


    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
      "mousemove",
      event => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;

      }
    );


    const animateGlow = () => {

      glowX +=
        (mouseX - glowX) *
        0.08;

      glowY +=
        (mouseY - glowY) *
        0.08;


      cursorGlow.style.left =
        `${glowX}px`;

      cursorGlow.style.top =
        `${glowY}px`;


      requestAnimationFrame(
        animateGlow
      );

    };


    animateGlow();

  }


  /* =========================================================
     MAGNETIC BUTTONS
  ========================================================= */

  if (finePointer) {

    const magneticElements =
      document.querySelectorAll(
        ".button, .header-contact"
      );


    magneticElements.forEach(
      element => {

        element.addEventListener(
          "mousemove",
          event => {

            const rect =
              element.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left -
              rect.width / 2;

            const y =
              event.clientY -
              rect.top -
              rect.height / 2;


            element.style.transform =
              `
              translate(
                ${x * 0.08}px,
                ${y * 0.08}px
              )
              `;

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            element.style.transform =
              "translate(0,0)";

          }
        );

      }
    );

  }


  /* =========================================================
     PROJECT IMAGE MOVEMENT
  ========================================================= */

  if (finePointer) {

    projects.forEach(
      project => {

        const image =
          project.querySelector(
            ".project-image"
          );

        if (!image) return;


        project.addEventListener(
          "mousemove",
          event => {

            const rect =
              project.getBoundingClientRect();


            const x =
              (
                event.clientX -
                rect.left
              ) /
              rect.width -
              0.5;


            const y =
              (
                event.clientY -
                rect.top
              ) /
              rect.height -
              0.5;


            image.style.transform =
              `
              translate(
                ${x * 7}px,
                ${y * 7}px
              )
              `;

          }
        );


        project.addEventListener(
          "mouseleave",
          () => {

            image.style.transform =
              "translate(0,0)";

          }
        );

      }
    );

  }


  /* =========================================================
     PROJECT SYMBOL ROTATION
  ========================================================= */

  if (finePointer) {

    const symbols =
      document.querySelectorAll(
        ".project-symbol"
      );


    symbols.forEach(
      symbol => {

        symbol.parentElement
          .parentElement
          .addEventListener(
            "mousemove",
            event => {

              const rect =
                symbol.parentElement
                  .parentElement
                  .getBoundingClientRect();


              const x =
                (
                  event.clientX -
                  rect.left
                ) /
                rect.width -
                0.5;


              const y =
                (
                  event.clientY -
                  rect.top
                ) /
                rect.height -
                0.5;


              symbol.style.transform =
                `
                rotate(
                  ${45 + x * 20}deg
                )
                translate(
                  ${x * 5}px,
                  ${y * 5}px
                )
                `;

            }
          );


        symbol.parentElement
          .parentElement
          .addEventListener(
            "mouseleave",
            () => {

              symbol.style.transform =
                "rotate(45deg)";

            }
          );

      }
    );

  }


  /* =========================================================
     DIRECTION CARD HOVER INDEX
  ========================================================= */

  directionCards.forEach(
    card => {

      card.addEventListener(
        "mouseenter",
        () => {

          directionCards.forEach(
            other => {

              if (other !== card) {

                other.style.opacity =
                  "0.45";

              }

            }
          );

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          directionCards.forEach(
            other => {

              other.style.opacity =
                "1";

            }
          );

        }
      );

    }
  );


  /* =========================================================
     ACTIVE SECTION IN NAVIGATION
  ========================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".desktop-nav a"
    );


  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              const id =
                entry.target.id;


              navLinks.forEach(
                link => {

                  link.classList.remove(
                    "active"
                  );


                  if (
                    link.getAttribute(
                      "href"
                    ) === `#${id}`
                  ) {

                    link.classList.add(
                      "active"
                    );

                  }

                }
              );

            }

          }
        );

      },
      {
        threshold: 0.45
      }
    );


  sections.forEach(
    section => {

      sectionObserver.observe(
        section
      );

    }
  );


  /* =========================================================
     ACTIVE NAV STYLE
  ========================================================= */

  const navStyle =
    document.createElement("style");

  navStyle.textContent = `

    .desktop-nav a.active {
      color: #f7f6f2;
    }

    .desktop-nav a.active::after {
      width: 100%;
    }

  `;

  document.head.appendChild(
    navStyle
  );


  /* =========================================================
     CONTACT LINK MICRO-INTERACTION
  ========================================================= */

  const contact =
    document.querySelector(
      ".contact-email"
    );


  if (
    contact &&
    finePointer
  ) {

    contact.addEventListener(
      "mousemove",
      event => {

        const rect =
          contact.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left -
          rect.width / 2;


        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        contact.style.transform =
          `
          translate(
            ${x * 0.025}px,
            ${y * 0.08}px
          )
          `;

      }
    );


    contact.addEventListener(
      "mouseleave",
      () => {

        contact.style.transform =
          "translate(0,0)";

      }
    );

  }


  /* =========================================================
     ESCAPE HOVER STATES
  ========================================================= */

  window.addEventListener(
    "blur",
    () => {

      directionCards.forEach(
        card => {

          card.style.opacity = "1";

        }
      );

    }
  );

});
