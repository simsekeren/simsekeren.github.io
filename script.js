// 1. Theme Button Logic
const themeButtons = document.querySelectorAll('.theme-button');

// Handle clicks
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', theme);

        // Update active state
        themeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Save preference
        localStorage.setItem('theme', theme);
    });
});

// 2. Set Initial Active Button State
// (The theme itself is already set by the head script, we just need to update the buttons)
const currentTheme = document.documentElement.getAttribute('data-theme');
themeButtons.forEach(btn => {
    if (btn.getAttribute('data-theme') === currentTheme) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
});

// 3. Contents Navigation Logic
const contentsDots = document.querySelectorAll('.contents-dot');

contentsDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionId = dot.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Update active dot on scroll
const sections = document.querySelectorAll('section[id]');

const updateActiveDot = () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    contentsDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentSection) {
            dot.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveDot);
updateActiveDot(); // Initial check