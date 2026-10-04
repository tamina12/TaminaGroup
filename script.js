```javascript
/* =========================================================
   TAMIN GROUP
   Interactive functionality
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const handleHeaderScroll = () => {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const openMenu = () => {

        menuButton.classList.add("active");
        mobileMenu.classList.add("active");

        menuButton.setAttribute("aria-expanded", "true");

        document.body.classList.add("menu-open");

    };


    const closeMenu = () => {

        menuButton.classList.remove("active");
        mobileMenu.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");

    };


    menuButton.addEventListener("click", () => {

        if (mobileMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICKING LINK
       ===================================================== */

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-label, " +
        ".group-layout, " +
        ".section-intro, " +
        ".direction-card, " +
        ".projects-heading, " +
        ".project-card, " +
        ".innovation-content, " +
        ".about-layout, " +
        ".contact-inner"
    );


    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       STAGGER DIRECTION CARDS
       ===================================================== */

    const directionCards =
        document.querySelectorAll(".direction-card");

    directionCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 70}ms`;

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId =
                anchor.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();


            const headerOffset = 70;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       MOUSE PARALLAX FOR HERO GLOW
       ===================================================== */

    const hero = document.querySelector(".hero");
    const heroGlow = document.querySelector(".hero-glow");


    if (
        hero &&
        heroGlow &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        hero.addEventListener("mousemove", event => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            heroGlow.style.transform =
                `translate(${x * 35}px, ${y * 35}px)`;

        });


        hero.addEventListener("mouseleave", () => {

            heroGlow.style.transform =
                "translate(0, 0)";

        });

    }


    /* =====================================================
       DISABLE PARALLAX ON MOBILE
       ===================================================== */

    const mediaQuery =
        window.matchMedia("(max-width: 700px)");

    const handleMobileState = event => {

        if (event.matches && heroGlow) {
            heroGlow.style.transform = "none";
        }

    };

    mediaQuery.addEventListener(
        "change",
        handleMobileState
    );


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


});
```
