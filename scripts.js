/**
 * Janitza's Valentine Website - Narrative Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollObserver();
    initPhysics(); // Subtle background
    initAudio();
});

function initScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.8 // Trigger ONLY when almost fully snapped
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve if we want it to only animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.story-screen, footer').forEach(screen => {
        observer.observe(screen);
    });
}

function initAudio() {
    const btn = document.getElementById('play-voice-btn');
    const audio = document.getElementById('voice-audio');

    if (btn && audio) {
        btn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                btn.textContent = "Playing...";
            } else {
                audio.pause();
                btn.textContent = "Listen to my voice";
            }
        });

        audio.addEventListener('ended', () => {
            btn.textContent = "Listen again";
        });
    }
}

// --- Antigravity Physics (Background Only) ---
// Simplified from previous version to be very subtle

const CONFIG = {
    words: ["Janitza", "Reina", "Forever", "Peace", "Love"],
    hearts: ["❤️", "💖", "💗"], // Heart particles
    gravity: 0.05, // Very low gravity for words
    drag: 0.01
};

function initPhysics() {
    const container = document.getElementById('floating-words-container');
    const particles = [];

    // Create Words
    CONFIG.words.forEach(text => {
        createParticle(text, 'word');
    });

    // Create Hearts (More of them, floating upwards)
    for (let i = 0; i < 20; i++) {
        createParticle(CONFIG.hearts[Math.floor(Math.random() * CONFIG.hearts.length)], 'heart');
    }

    function createParticle(text, type) {
        const el = document.createElement('div');
        el.classList.add(type === 'heart' ? 'floating-heart' : 'floating-word');
        el.textContent = text;
        container.appendChild(el);

        particles.push({
            el: el,
            type: type,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * (type === 'heart' ? 0.3 : 0.5),
            vy: (Math.random() - 0.5) * (type === 'heart' ? 0.8 : 0.5) - (type === 'heart' ? 0.5 : 0) // Hearts float up
        });
    }

    function loop() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce words, Wrap hearts
            if (p.type === 'word') {
                if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
                if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
            } else {
                // Hearts wrap around to bottom to float up forever
                if (p.y < -50) p.y = window.innerHeight + 50;
                if (p.x < -50) p.x = window.innerWidth + 50;
                if (p.x > window.innerWidth + 50) p.x = -50;
            }

            p.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
        });
        requestAnimationFrame(loop);
    }

    // Only run if not reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        loop();
    }
}
