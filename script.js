document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Tool cards interaction
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            const tool = card.dataset.tool;
            handleToolClick(tool);
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            // Simulate form submission
            submitForm(formData);
        });
    }

    

    loadTechNews();
    
    // Tool card navigation
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', () => {
            const tool = card.getAttribute('data-tool');
            showPage(tool);
        });
    });

    animateOnScroll();
    initMobileMenu();
});


function submitForm(formData) {
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        document.getElementById('contactForm').reset();
        setTimeout(() => {
            submitBtn.textContent = 'Send Message';
        }, 2000);
    }, 1500);
}




// Add intersection observer for animations
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
            }
        });
    });

    document.querySelectorAll('.tool-card, .pricing-card, .benefit-card').forEach(el => {
        observer.observe(el);
    });
};

