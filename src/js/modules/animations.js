import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export const initPageOpenAnimations = () => {
    gsap.set([".contact-info", ".social-instagram a", ".header", "[data-menu='logo']", "[data-menu='button']", "#menu > li > a", "#menu > li > span", ".introducao-texto h1", ".introducao-texto p", ".introducao-texto a"], { opacity: 0 });
    
    gsap.to(".header", { duration: 1, opacity: 1, ease: "power1.inOut" });
    gsap.to(".contact-info", { duration: 1, delay: 0.2, opacity: 1, ease: "power1.inOut" });
    gsap.to(".social-instagram a", { duration: 1, delay: 0.4, opacity: 1, ease: "power1.inOut" });
    gsap.to("[data-menu='logo']", { duration: 1, delay: 0.6, opacity: 1, ease: "power1.inOut" });
    gsap.to("[data-menu='button']", { duration: 1, delay: 0.7, opacity: 1, ease: "power1.inOut" });
    gsap.to(".introducao-texto p", { duration: 1, delay: 2, opacity: 1, ease: "power1.inOut" });
    gsap.to(".introducao-texto a", { duration: 1, delay: 2.2, opacity: 1, ease: "power1.inOut" });

    // Anima apenas os links e spans de primeiro nível, incluindo o <span>Serviços</span>
    gsap.to("#menu > li > a, #menu > li > span", { 
        duration: 0.4, 
        delay: 0.8, 
        opacity: 1, 
        stagger: 0.2, 
        ease: "power1.out" 
    });

    const h1 = document.querySelector('.wave-text');
    if (h1) {
        h1.innerHTML = h1.textContent.split('').map(letter => `<span>${letter}</span>`).join('');
        gsap.set(h1, { opacity: 1 });
    }

    const introducao = document.querySelector(".introducao");
    if (introducao) {
        gsap.fromTo(introducao, {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            opacity: 0
        }, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => introducao.style.clipPath = 'none'
        });
    }

    const waveTextSpans = document.querySelectorAll(".introducao-texto h1 span");
    if (waveTextSpans.length > 0) {
        gsap.from(waveTextSpans, {
            duration: 0.2,
            opacity: 0,
            ease: "power1.inOut",
            y: -20,
            stagger: {
                each: 0.02,
                from: "start",
                yoyo: true,
                repeat: 0
            },
            delay: 1
        });
    }
};

export const initScrollAnimations = () => {
    const sections = document.querySelectorAll('section:not(.introducao), footer');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power1.out"
        });
    });
};