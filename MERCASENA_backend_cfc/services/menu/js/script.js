document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video-background');
    const image = document.getElementById('image-background');


    if (video) {
        video.onloadeddata = function() {
            image.style.display = 'none'; 
            video.style.display = 'block'; 
        };
        video.onerror = function() {
            console.error("Error al cargar el video. Se mostrará la imagen de fondo.");
            video.style.display = 'none'; 
            image.style.display = 'block'; 
        };
    } else {
        image.style.display = 'block'; 
    }
});