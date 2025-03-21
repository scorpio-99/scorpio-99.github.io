document.addEventListener('click', function(e) {
    const heart = utils.createElement('floating-heart', '❤️');
    heart.style.left = e.pageX + 'px';
    heart.style.top = e.pageY + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), ANIMATION_SETTINGS.heartDuration);
}); 