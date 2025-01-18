document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('background-audio');
    const volumeSlider = document.querySelector('.volume-slider');
    const soundButton = document.querySelector('.sound-button');
    const video = document.querySelector('.background-video');

    // Попробуем запустить аудио при взаимодействии с сайтом
    document.body.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
        }
    });

    // Устанавливаем начальное значение громкости
    audio.volume = volumeSlider.value / 40;

    // Обработчик для изменения громкости
    volumeSlider.addEventListener('input', function () {
        audio.volume = this.value / 100;
    });

    // Обработчик для кнопки отключения/включения звука видео
    soundButton.addEventListener('click', function () {
        video.muted = !video.muted;
    });
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Текст скопирован!');
    }).catch(err => {
        console.error('Не удалось скопировать текст: ', err);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000); // Убираем уведомление через 2 секунды
}
