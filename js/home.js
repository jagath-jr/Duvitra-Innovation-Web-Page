document.addEventListener("DOMContentLoaded", function() {
gsap.registerPlugin(ScrollTrigger);

    // ========== Services Section Flip Cards (Scroll + Click/Touch) ==========
    function flipCard(cardInner, isManualFlip = true) {
        const currentRotation = gsap.getProperty(cardInner, "rotationX");
        const targetRotation = currentRotation === 0 ? 180 : 0;
        
        gsap.to(cardInner, {
            rotationX: targetRotation,
            duration: isManualFlip ? 0.6 : 1,
            ease: isManualFlip ? "back.out(1.7)" : "power2.inOut",
            onComplete: () => {
                // Update ARIA attributes for accessibility
                cardInner.setAttribute('aria-expanded', targetRotation === 180);
            }
        });
    }

    function setupCardInteractions() {
        const serviceCards = gsap.utils.toArray(".service-item .service-card-inner");
        
        serviceCards.forEach(card => {
            // Click/tap interaction
            card.addEventListener("click", (e) => {
                e.stopPropagation();
                flipCard(card, true);
            });
            
            // Touch interaction
            card.addEventListener("touchend", (e) => {
                e.preventDefault();
                flipCard(card, true);
            }, { passive: false });
            
            // Keyboard accessibility
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    flipCard(card, true);
                }
            });
            
            // Initialize ARIA attributes
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-expanded', 'false');
        });
    }

    ScrollTrigger.matchMedia({
        // --- Desktop Animation ---
        "(min-width: 1025px)": function() {
            const servicesSection = document.querySelector(".services-section");
            const serviceCards = gsap.utils.toArray(".service-item .service-card-inner");
            const serviceItems = gsap.utils.toArray(".service-item");
            const container = document.querySelector(".container");

            setupCardInteractions();

            // Calculate pin duration based on content height
            const cardHeight = serviceCards[0].offsetHeight;
            const scrollDistance = cardHeight * serviceCards.length * 0.8;

            // Pin the entire section while scrolling
            ScrollTrigger.create({
                trigger: servicesSection,
                start: "top top",
                end: `+=${scrollDistance}`,
                pin: true,
                pinSpacing: true,
                id: "services-pin",
                anticipatePin: 1
            });

            // Staggered flip animation on scroll
            gsap.to(serviceCards, {
                rotationX: 180,
                duration: 1,
                stagger: {
                    each: 0.3,
                    from: "center",
                    ease: "power2.inOut"
                },
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: servicesSection,
                    start: "top top+=100",
                    end: `+=${scrollDistance}`,
                    scrub: 1,
                    pin: false,
                    markers: false // Set to true for debugging
                }
            });

            // Additional scale effect on hover
            serviceItems.forEach(item => {
                item.addEventListener("mouseenter", () => {
                    gsap.to(item, {
                        scale: 1.03,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                item.addEventListener("mouseleave", () => {
                    gsap.to(item, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });
        },
        
        // --- Tablet Animation ---
        "(min-width: 769px) and (max-width: 1024px)": function() {
            setupCardInteractions();
            
            // Simpler scroll-triggered animation for tablets
            gsap.utils.toArray(".service-item").forEach((item, i) => {
                const cardInner = item.querySelector('.service-card-inner');
                
                ScrollTrigger.create({
                    trigger: item,
                    start: "top 70%",
                    end: "top 20%",
                    onEnter: () => flipCard(cardInner, false),
                    onEnterBack: () => flipCard(cardInner, false),
                    markers: false
                });
            });
        },
        
        // --- Mobile Animation ---
        "(max-width: 768px)": function() {
            setupCardInteractions();
            
            // Click-only interaction for mobile with entrance animation
            gsap.utils.toArray(".service-item").forEach((item, i) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 50,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }
    });

    // Additional animation for the Lottie element
    gsap.from("#service-lottie", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".service-intro",
            start: "top 80%",
            toggleActions: "play none none none"
        
                // OR Option 2: Click-only interaction (remove the above if using this)
            // Just call setupCardInteractions() and nothing else
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

    // ========== Lines Animation ==========
    const linesContainer = document.querySelector('.lines-container');
    if (linesContainer) {
        const numberOfLines = 18;
        const baseDuration = 8000;

        for (let i = 0; i < numberOfLines; i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            
            line.style.setProperty('--opacity-peak', `${0.7 + Math.random() * 0.3}`);
            line.style.setProperty('--drop-height', `${60 + Math.random() * 60}px`);
            line.style.setProperty('--drop-duration', `${4000 + Math.random() * 2000}ms`);
            line.style.setProperty('--animation-delay', `${Math.random() * 300}ms`);
            
            linesContainer.appendChild(line);
        }

        gsap.to(".line", {
            backgroundPosition: "0% 100%",
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                each: 0.1,
                from: "center",
                ease: "power2.inOut"
            }
        });

        setInterval(() => {
            document.querySelectorAll('.line').forEach(line => {
                line.style.animation = 'none';
                void line.offsetWidth;
                line.style.animation = '';
            });
        }, 30000);
    }

    // ========== Lottie Animation ==========
    const lottieContainer = document.getElementById('lottie-animation-container');
    if (lottieContainer && typeof lottie !== 'undefined') {
        lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'SVG/Connect with us.json'
        });
    }

    // ========== Text Animations ==========
    const elementsToAnimate = gsap.utils.toArray('.animate-text');
    if (elementsToAnimate.length && typeof SplitType !== 'undefined') {
        elementsToAnimate.forEach((element, index) => {
            const split = new SplitType(element, { types: 'words' });
            gsap.set(element, { opacity: 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            tl.from(split.words, {
                y: '100%',
                opacity: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: 'power2.out',
                delay: index * 0.2
            });
        });
    }

    // ========== Button Animation ==========
    const darkButton = document.querySelector('.btn-dark');
    if (darkButton) {
        gsap.from(darkButton, {
            opacity: 0,
            scale: 0.8,
            delay: 1.0,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
    }
});