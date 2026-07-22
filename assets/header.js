// Render header.
const header = document.querySelector('header');
const path = window.location.pathname;
header.innerHTML = `
    <div class="header-top">
        <a href="/" class="logo-nav">Tmpstpdwn</a>
        <button id="theme-toggle" aria-label="Toggle Theme"></button>
    </div>
    <nav>
        <a href="/projects/" ${path.includes('/projects') ? 'class="active"' : ''}>Projects</a>
        <a href="/blogs/" ${path.includes('/blogs') ? 'class="active"' : ''}>Blogs</a>
        <a href="/resume/" ${path.includes('/resume') ? 'class="active"' : ''}>Resume</a>
    </nav>
`;

// Theme toggling.
const themeToggleBtn = document.getElementById('theme-toggle');
let currentTheme = document.documentElement.getAttribute('data-theme');
themeToggleBtn.textContent = currentTheme === "dark" ? 'L' : 'D';
themeToggleBtn.addEventListener('click', () => {
    if (currentTheme === 'dark') {
        currentTheme = 'light';
    } else {
        currentTheme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    themeToggleBtn.textContent =
        currentTheme === 'dark' ? 'L' : 'D';
});
