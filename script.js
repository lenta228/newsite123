// Начать воспроизведение музыки сразу при загрузке страницы
window.onload = function() {
    var audio = document.getElementById("background-music");
    audio.play().catch(function(e) {
        console.log("Ошибка воспроизведения музыки: " + e);
    });
};

// Функция для копирования текста в буфер обмена
function copyToClipboard(text) {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert('Никнейм скопирован: ' + text);
}
