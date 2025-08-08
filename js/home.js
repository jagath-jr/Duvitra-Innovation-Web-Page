document.addEventListener("DOMContentLoaded", function() {
    // ========== Services Section Flip Cards (Scroll + Click/Touch) ==========
    gsap.registerPlugin(ScrollTrigger);

    // Function to flip a card
    function flipCard(cardInner) {
        const currentRotation = gsap.getProperty(cardInner, "rotationX");
        gsap.to(cardInner, {
            rotationX: currentRotation === 0 ? 180 : 0,
            duration: 0.6,
            ease: "power1.inOut"
        });
    }

    // Add click/touch event listeners to all cards
    function setupCardInteractions() {
        const serviceCards = gsap.utils.toArray(".service-item .service-card-inner");
        
        serviceCards.forEach(card => {
            card.addEventListener("click", () => flipCard(card));
            card.addEventListener("touchend", (e) => {
                e.preventDefault();
                flipCard(card);
            }, { passive: false });
        });
    }

    ScrollTrigger.matchMedia({
        // --- Desktop and Tablet Animation ---
        "(min-width: 769px)": function() {
            const servicesSection = document.querySelector(".services-section");
            const serviceCards = gsap.utils.toArray(".service-item .service-card-inner");
            const container = document.querySelector(".container");

            setupCardInteractions();

            const cardHeight = serviceCards[0].offsetHeight;
            const scrollDistance = cardHeight * serviceCards.length * 0.6;

            ScrollTrigger.create({
                trigger: servicesSection,
                start: "top top",
                end: `+=${scrollDistance}`,
                pin: true,
                pinSpacing: true,
                id: "services-pin"
            });

            gsap.to(serviceCards, {
                rotationX: 180,
                duration: 0.6,
                stagger: 0.2,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: servicesSection,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: true,
                    pin: false
                }
            });
        },

        // --- Mobile Animation ---
        "(max-width: 768px)": function() {
            setupCardInteractions();
            
            gsap.utils.toArray(".service-item").forEach(item => {
                const cardInner = item.querySelector('.service-card-inner');
                
                gsap.to(cardInner, {
                    rotationX: 180,
                    duration: 0.6,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play reverse play reverse",
                    }
                });
            });
        }
    });

    // ========== Counter Animation ==========
    function animateCounter(element, endValue, duration) {
        let startTime = null;
        const startValue = 0;
        
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const progressFraction = Math.min(progress / duration, 1);
            const currentValue = Math.floor(progressFraction * endValue);
            element.textContent = currentValue + '+';
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    function setupCounters() {
        const statsSection = document.getElementById('statsSection');
        if (!statsSection) return;
        
        const counters = document.querySelectorAll('.stat-number');
        let countersAnimated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    
                    counters.forEach(counter => {
                        const endValue = parseInt(counter.getAttribute('data-end'));
                        const duration = parseInt(counter.getAttribute('data-duration'));
                        animateCounter(counter, endValue, duration);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    setupCounters();

    // ========== Logo Slider Optimization ==========
    const slider = document.querySelector('.logo-slider-2025');
    if (slider) {
        const slideTrack = document.querySelector('.logos-slide-2025');
        
        if (slideTrack && !slideTrack.querySelector('[data-cloned]')) {
            const logos = slideTrack.innerHTML;
            slideTrack.innerHTML = logos + logos;
            slideTrack.querySelectorAll('img').forEach((img, index) => {
                if (index >= 8) img.setAttribute('data-cloned', 'true');
            });
        }
        
        document.addEventListener("visibilitychange", () => {
            if (slideTrack) {
                slideTrack.style.animationPlayState = document.hidden ? 'paused' : 'running';
            }
        });
        
        if (slideTrack) slideTrack.style.transform = 'translateZ(0)';
    }

    // ========== Product Cards Interaction ==========
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener("click", () => {
            const title = card.querySelector('h3')?.innerText;
            if (title) console.log(`Clicked on ${title} card`);
        });
    });
});