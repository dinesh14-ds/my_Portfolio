document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typewriter Effect ---
    const typewriter = document.getElementById('typewriter');
    const words = [
        "Java Backend Developer",
        "Spring Boot Enthusiast",
        "Mechanical Engineering Graduate",
        "Problem Solver",
        "prompt Engineer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // normal typing
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typewriter
    type();


    // --- 2. Header Scroll Effect & Active Section Highlighting ---
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header Class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Handle edge case where navbar is at absolute top of the page
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-links a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });


    // --- 3. Mobile Navigation Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            const isActive = navLinksContainer.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }


    // --- 4. Scroll Reveal Animations & Skill Bars Trigger ---
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    // Initialize skill bars to 0% for scroll animation
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });

        // Specific trigger for skill percentages animation
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const skillsTop = skillsSection.getBoundingClientRect().top;
            if (skillsTop < triggerBottom) {
                skillBars.forEach(bar => {
                    const inlineWidth = bar.parentElement.previousElementSibling.querySelector('.skill-percentage').textContent;
                    bar.style.width = inlineWidth;
                });
            }
        }
    }

    window.addEventListener('scroll', checkReveal);
    // Trigger once on page load
    checkReveal();


    // --- 5. Projects Tab Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projects-grid .project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                // Hide and reveal with styling transition
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow to restart entry animation
                    void card.offsetWidth;
                    card.classList.add('active');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('active');
                }
            });
        });
    });


    // --- 6. Contact Form Success Overlay ---
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (contactForm && successModal && closeModalBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple client validation checker
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && subject && message) {
                // Open the glass modal
                successModal.classList.add('active');
                // Reset form inputs
                contactForm.reset();
            }
        });

        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });

        // Close modal clicking outside the card content
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
});
