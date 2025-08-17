document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    // ========== Services Section Flip Cards (Scroll + Click/Touch) ==========
    function flipCard(cardInner) {
        const currentRotation = gsap.getProperty(cardInner, "rotationX");
        gsap.to(cardInner, {
            rotationX: currentRotation === 0 ? 180 : 0,
            duration: 0.6,
            ease: "power1.inOut"
        });
    }

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
            
            // Choose one approach for mobile - either scroll-triggered or click-only
            // Option 1: Scroll-triggered animation
            gsap.utils.toArray(".service-item").forEach(item => {
                const cardInner = item.querySelector('.service-card-inner');
                
                gsap.to(cardInner, {
                    rotationX: 180,
                    duration: 0.6,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 10%",
                        toggleActions: "play reverse play reverse",
                    }
                });
            });
            
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
            loop: true,
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