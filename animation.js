window.addEventListener('scroll', () => {
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach((card, index) => {
        if (card.getBoundingClientRect().top < window.innerHeight) {
            card.style.animation = `fadeIn 0.6s ease forwards ${index / 7 + 0.2}s`;
        }
    });
});
