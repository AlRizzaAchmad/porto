// =================================
// 1. NAVBAR SCROLL EFFECT
// =================================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// =================================
// 2. MOBILE MENU
// =================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


// =================================
// 3. REVEAL ANIMATION ON SCROLL
// =================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// =================================
// 4. ACTIVE NAVIGATION
// =================================

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const currentId = entry.target.getAttribute("id");

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${currentId}`) {
                    link.classList.add("active");
                }

            });

        }

    });

}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => {
    sectionObserver.observe(section);
});


// =================================
// 5. PROJECT CARD TILT EFFECT
// =================================

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth <= 700) return;

        const rect = card.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - mouseY) / 35;
        const rotateY = (mouseX - centerX) / 50;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});


// =================================
// 6. MAGNETIC BUTTON EFFECT
// =================================

const magneticButtons = document.querySelectorAll(
    ".button-light, .contact-button"
);

magneticButtons.forEach(button => {

    button.addEventListener("mousemove", event => {

        if (window.innerWidth <= 700) return;

        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0, 0)";

    });

});


// =================================
// 7. FOOTER CURRENT YEAR
// =================================

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();