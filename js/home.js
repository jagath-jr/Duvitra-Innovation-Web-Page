document.addEventListener('DOMContentLoaded', function() {
    // Register plugins once
    gsap.registerPlugin(ScrollTrigger);
    
    // Cache all selectors at once
    const elements = {
        servicesSection: document.querySelector(".services-section"),
        serviceItems: gsap.utils.toArray(".service-item"),
        serviceCards: gsap.utils.toArray(".service-item .service-card-inner"),
        statsSection: document.getElementById('statsSection'),
        lottieContainer: document.getElementById('lottie-animation-container'),
        darkButton: document.querySelector('.btn-dark'),
        linesContainer: document.querySelector('.lines-container'),
        sliderContainer: document.querySelector('.logo-slider-2025'),
        lottiePlayer: document.getElementById('service-lottie'),
        slideTrack: document.querySelector('.logos-slide-2025'),
        productCards: document.querySelectorAll('.product-card')
    };
    
    // Initialize all components
    function init() {
        setupServicesAnimations();
        setupCounters();
        setupLogoSlider();
        setupProductCards();
        setupLinesAnimation();
        setupLottieAnimation();
        setupTextAnimations();
        setupButtonAnimation();
    }
    
    // ========== Services Section Animations ==========
    function setupServicesAnimations() {
        if (!elements.servicesSection || !elements.serviceCards.length) return;
        
        // Initially pause the Lottie animation
        if (elements.lottiePlayer) elements.lottiePlayer.pause();
        
        // Create scroll trigger for Lottie animation
        ScrollTrigger.create({
            trigger: "#services",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => elements.lottiePlayer && elements.lottiePlayer.play(),
            onLeaveBack: () => elements.lottiePlayer && elements.lottiePlayer.stop()
        });
        
        // Setup card interactions based on device
        setupCardInteractions();
        
        // Setup responsive animations
        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 1025px)": setupDesktopAnimations,
            // Tablet
            "(min-width: 769px) and (max-width: 1024px)": setupTabletAnimations,
            // Mobile
            "(max-width: 768px)": setupMobileAnimations
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
            }
        });
    }
    
    function setupDesktopAnimations() {
        setupHoverEffects();
        
        // Calculate pin duration based on content height
        const cardHeight = elements.serviceCards[0]?.offsetHeight || 0;
        const scrollDistance = cardHeight * elements.serviceCards.length * 0.8;
        
        // Pin the entire section while scrolling
        ScrollTrigger.create({
            trigger: elements.servicesSection,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            id: "services-pin",
            anticipatePin: 1
        });
        
        // Staggered flip animation on scroll
        gsap.to(elements.serviceCards, {
            rotationX: 180,
            duration: 1,
            stagger: {
                each: 0.3,
                from: "center",
                ease: "power2.inOut"
            },
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: elements.servicesSection,
                start: "top top+=100",
                end: `+=${scrollDistance}`,
                scrub: 1,
                pin: false
            }
        });
    }
    
    function setupTabletAnimations() {
        // Simpler scroll-triggered animation for tablets
        elements.serviceItems.forEach((item) => {
            const cardInner = item.querySelector('.service-card-inner');
            if (!cardInner) return;
            
            ScrollTrigger.create({
                trigger: item,
                start: "top 70%",
                end: "top 20%",
                onEnter: () => flipCard(cardInner, false),
                onEnterBack: () => flipCard(cardInner, false)
            });
        });
    }
    
    function setupMobileAnimations() {
        // Click-only interaction for mobile with entrance animation
        elements.serviceItems.forEach((item, i) => {
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
    
    function setupCardInteractions() {
        elements.serviceCards.forEach(card => {
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
    
    function setupHoverEffects() {
        elements.serviceItems.forEach(item => {
            item.addEventListener("mouseenter", () => {
                if ('ontouchstart' in window) return; // Skip on touch devices
                gsap.to(item, {
                    scale: 1.03,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            item.addEventListener("mouseleave", () => {
                if ('ontouchstart' in window) return; // Skip on touch devices
                gsap.to(item, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }
    
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
    
    // ========== Counter Animation ==========
    function setupCounters() {
        if (!elements.statsSection) return;
        
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
        
        observer.observe(elements.statsSection);
    }
    
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
    
    // ========== Logo Slider Animation ==========
   function setupLogoSlider() {
    if (!elements.sliderContainer || !elements.slideTrack) return;

    const logos = elements.slideTrack.querySelectorAll('img');
    if (!logos.length) return;

    // Clone logos for the seamless loop
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        elements.slideTrack.appendChild(clone);
    });

    // Create a GSAP timeline that repeats indefinitely
    const tl = gsap.timeline({
        repeat: -1
    });

    // 1. Animate the slide to the halfway point
    tl.to(elements.slideTrack, {
        x: "-50%",
        ease: "none",
        duration: 35
    });

    // 2. Instantly reset the position to the start (this is invisible)
    tl.set(elements.slideTrack, {
        x: "0"
    });

    // Pause animation on hover
    elements.sliderContainer.addEventListener('mouseenter', () => tl.pause());
    elements.sliderContainer.addEventListener('mouseleave', () => tl.resume());

    // Pause animation when the browser tab is not active
    document.addEventListener("visibilitychange", () => {
        // Use tl.pause() when hidden and tl.resume() when visible
        document.hidden ? tl.pause() : tl.resume();
    });
}
    
    
    // ========== Product Cards Interaction ==========
    function setupProductCards() {
        if (!elements.productCards.length) return;
        
        elements.productCards.forEach(card => {
            card.addEventListener("click", () => {
                const title = card.querySelector('h3')?.innerText;
                if (title) console.log(`Clicked on ${title} card`);
            });
        });
    }
    
    // ========== Lines Animation ==========
    function setupLinesAnimation() {
        if (!elements.linesContainer) return;
        
        const numberOfLines = 18;

        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < numberOfLines; i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            
            line.style.setProperty('--opacity-peak', `${0.7 + Math.random() * 0.3}`);
            line.style.setProperty('--drop-height', `${60 + Math.random() * 60}px`);
            line.style.setProperty('--drop-duration', `${4000 + Math.random() * 2000}ms`);
            line.style.setProperty('--animation-delay', `${Math.random() * 300}ms`);
            
            fragment.appendChild(line);
        }
        
        elements.linesContainer.appendChild(fragment);

        // Use a single GSAP animation for all lines
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

        // Reset animation periodically
        setInterval(() => {
            document.querySelectorAll('.line').forEach(line => {
                line.style.animation = 'none';
                void line.offsetWidth;
                line.style.animation = '';
            });
        }, 30000);
    }
    
    // ========== Lottie Animation ==========
    function setupLottieAnimation() {
        if (elements.lottieContainer && typeof lottie !== 'undefined') {
            lottie.loadAnimation({
                container: elements.lottieContainer,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                path: 'SVG/Connect with us.json'
            });
        }
    }
    
    // ========== Text Animations ==========
    function setupTextAnimations() {
        const elementsToAnimate = gsap.utils.toArray('.animate-text');
        if (!elementsToAnimate.length || typeof SplitType === 'undefined') return;
        
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
    function setupButtonAnimation() {
        if (!elements.darkButton) return;
        
        gsap.from(elements.darkButton, {
            opacity: 0,
            scale: 0.8,
            delay: 1.0,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
    }
    
    // Start the initialization
    init();
});