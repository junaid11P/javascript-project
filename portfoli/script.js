// script.js
window.addEventListener('scroll', revealSections);

function revealSections() {
    const sections = document.querySelectorAll('.section');
    const triggerHeight = window.innerHeight / 1.3;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerHeight) {
            section.classList.add('visible');
        }
    });
}