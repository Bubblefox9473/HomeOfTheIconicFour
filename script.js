document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    });
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
});
