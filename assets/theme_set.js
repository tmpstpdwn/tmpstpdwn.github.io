// Set theme to the stored one; else set it to "light".
const savedTheme = localStorage.getItem('theme');

if (savedTheme === "dark" || savedTheme === "light") {
    document.documentElement.setAttribute('data-theme', savedTheme);
} else {
    document.documentElement.setAttribute('data-theme', "light");
}
