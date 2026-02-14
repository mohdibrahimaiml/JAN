// JANITZA - Cinematic Logic Standard
const CONFIG = {
    hearts: ['❤️', '💖', '✨', '🌹'],
    videoDelay: 400
};

document.addEventListener('DOMContentLoaded', () => {
    initScrollObserver();
    initParticles();
    initAudio();
    checkAccessibility();
});

function initScrollObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Requirement 3: 20% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                revealSection(section);
                observer.unobserve(section); // Requirement 3: Animate only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.story-screen').forEach(section => {
        observer.observe(section);
    });
}

function revealSection(section) {
    // Reveal child items
    const items = section.querySelectorAll('.reveal-item');
    items.forEach(item => {
        item.classList.add('revealed');
    });

    // Special logic for Video (Requirement 8)
    const videoWrapper = section.querySelector('.video-wrapper');
    if (videoWrapper) {
        setTimeout(() => {
            videoWrapper.classList.add('revealed');
        }, CONFIG.videoDelay);
    }

    // Final section specifics (Requirement 9)
    if (section.id === 'Final') {
        document.body.classList.add('no-particles');
    } else {
        document.body.classList.add('show-particles');
    }
}

function initAudio() {
    const btn = document.getElementById('play-voice-btn');
    const audio = document.getElementById('voice-audio');
    if (!btn || !audio) return;

    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            btn.textContent = "🔊 Playing Story...";
        } else {
            audio.pause();
            btn.textContent = "Listen to the Story";
        }
    });

    audio.addEventListener('ended', () => {
        btn.textContent = "Listen again";
    });
}

function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    // Requirement 11: Reduce particles on mobile
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 8 : 15;

    for (let i = 0; i < count; i++) {
        createHeart(container);
    }
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerText = CONFIG.hearts[Math.floor(Math.random() * CONFIG.hearts.length)];

    resetHeart(heart);
    container.appendChild(heart);
}

function resetHeart(heart) {
    // Slow, subtle, unintentional movement (Requirement 6)
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 30000 + Math.random() * 40000; // Very slow

    heart.style.left = `${x}vw`;
    heart.style.top = `${y}vh`;
    heart.style.transition = `all ${duration}ms linear`;

    setTimeout(() => {
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `${Math.random() * 100}vh`;
    }, 100);

    heart.addEventListener('transitionend', () => resetHeart(heart), { once: true });
}

function checkAccessibility() {
    // Requirement 12: Reduced Motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('no-animations');
        const container = document.getElementById('particles-container');
        if (container) container.innerHTML = '';

        document.querySelectorAll('.reveal-item, .video-wrapper').forEach(el => {
            el.classList.add('revealed');
        });
    }
}
