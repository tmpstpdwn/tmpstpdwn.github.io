// Copy the give text and notify copy took place.
function copy(event, text, time) {
    event.preventDefault();
    const link = event.target;
    const originalText = link.textContent;

    navigator.clipboard.writeText(text).then(() => {
        link.textContent = "Copied!";
        setTimeout(() => {
            link.textContent = originalText;
        }, time);
    });
}
