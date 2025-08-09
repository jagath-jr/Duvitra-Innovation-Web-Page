// GSAP Animation
window.addEventListener("load", () => {
    gsap.from("#webdev-hero h1", { opacity: 0, y: -50, duration: 1 });
    gsap.from("#webdev-hero p", { opacity: 0, y: 50, delay: 0.3, duration: 1 });

    gsap.from(".intro-text", { opacity: 0, x: -100, duration: 1, delay: 0.5 });
    gsap.from(".intro-image", { opacity: 0, x: 100, duration: 1, delay: 0.5 });

    gsap.from(".expertise-card", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        delay: 1
    });
});
