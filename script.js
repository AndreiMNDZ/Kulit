// Music control functionality
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');

    let isPlaying = false;

    // Function to toggle play/pause
    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
            playPauseBtn.classList.remove('playing');
            playPauseBtn.innerHTML = '<span id="playIcon">▶️</span><span id="pauseIcon" style="display: none;">⏸️</span>Play Music';
        } else {
            audio.play().catch(function(error) {
                console.log('Audio play failed:', error);
                alert('Please add a music file to your project folder and update the audio source in index.html');
            });
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
            playPauseBtn.classList.add('playing');
            playPauseBtn.innerHTML = '<span id="playIcon" style="display: none;">▶️</span><span id="pauseIcon">⏸️</span>Pause Music';
        }
        isPlaying = !isPlaying;
    }

    // Add click event listener to the button
    playPauseBtn.addEventListener('click', toggleMusic);

    // Handle audio end (for non-looping audio)
    audio.addEventListener('ended', function() {
        isPlaying = false;
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
        playPauseBtn.classList.remove('playing');
        playPauseBtn.innerHTML = '<span id="playIcon">▶️</span><span id="pauseIcon" style="display: none;">⏸️</span>Play Music';
    });

    // Add keyboard shortcut (Spacebar to toggle music)
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault(); // Prevent page scroll
            toggleMusic();
        }
    });

    // Add visual feedback for button interactions
    playPauseBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    playPauseBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Photo Gallery Interactions
    const photoItems = document.querySelectorAll('.photo-item');

    photoItems.forEach((item, index) => {
        // Add click animation
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Simple lightbox effect
            showLightbox(this.querySelector('img').src, this.querySelector('.photo-caption').textContent);
        });

        // Add staggered entrance animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Simple lightbox function
    function showLightbox(imageSrc, caption) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;

        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.cssText = `
            max-width: 80%;
            max-height: 80%;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            animation: zoomIn 0.3s ease;
        `;

        const captionDiv = document.createElement('div');
        captionDiv.textContent = caption;
        captionDiv.style.cssText = `
            position: absolute;
            bottom: 20px;
            color: white;
            font-size: 1.2em;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        `;

        lightbox.appendChild(img);
        lightbox.appendChild(captionDiv);
        document.body.appendChild(lightbox);

        // Close lightbox on click
        lightbox.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        });
    }
});
