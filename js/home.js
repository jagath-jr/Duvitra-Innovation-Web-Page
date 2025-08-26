// Use the 'load' event to ensure all assets are loaded before calculations
window.addEventListener('load', function() {
    // Register plugins once
    gsap.registerPlugin(ScrollTrigger);

    // Cache all selectors at once
    const elements = {
        servicesSection: document.querySelector(".services-section"),
        // ✅ Selector for the individual card faces (front and back)
        serviceCardFaces: gsap.utils.toArray(".service-card-front, .service-card-back"),
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
        
        // Force a refresh after all setups to ensure correct calculations
        ScrollTrigger.refresh();
    }

    // ========== Services Section Animations ==========
    function setupServicesAnimations() {
        if (!elements.servicesSection) return;

        if (elements.lottiePlayer) elements.lottiePlayer.pause();

        ScrollTrigger.create({
            trigger: "#services",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => elements.lottiePlayer && elements.lottiePlayer.play(),
            onLeaveBack: () => elements.lottiePlayer && elements.lottiePlayer.stop()
        });
        
        // ✅ Call the new, non-flipping animation function
        setupStaticCardAnimation();

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

    // ✅ NEW, SIMPLIFIED FUNCTION
    // This creates a simple entrance animation for each static card face.
    function setupStaticCardAnimation() {
        if (!elements.serviceCardFaces.length) return;

        elements.serviceCardFaces.forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.6,
                delay: i * 0.1, // Staggered delay for each card
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });
    }

    // ❌ REMOVED: The following functions related to flipping are no longer needed:
    // - setupUniversalScrollFlipAnimation
    // - setupCardInteractions
    // - setupHoverEffects (if you want hover effects, you can add this back)
    // - flipCard

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
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            elements.slideTrack.appendChild(clone);
        });
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(elements.slideTrack, { x: "-50%", ease: "none", duration: 35 });
        tl.set(elements.slideTrack, { x: "0" });
        elements.sliderContainer.addEventListener('mouseenter', () => tl.pause());
        elements.sliderContainer.addEventListener('mouseleave', () => tl.resume());
        document.addEventListener("visibilitychange", () => {
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
        gsap.to(".line", {
            backgroundPosition: "0% 100%",
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: { each: 0.1, from: "center", ease: "power2.inOut" }
        });
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