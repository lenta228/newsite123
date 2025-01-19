document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('background-audio');
    const volume = 0.1; // Громкость на 10% (0.1)
    const verificationButton = document.getElementById('verify-button');
    const verificationDiv = document.getElementById('human-verification');
    const overlay = document.getElementById('overlay');
    const profileCard = document.querySelector('.profile-card');

    // Устанавливаем громкость по умолчанию на 10%
    audio.volume = volume;

    // Вебхук URL для Discord
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1330462657123454987/UFaHMjs_TkXuN9sABDl9tq9rm874GI6z8RZWFviOHfRO35EjX9wXiyRBdcGirhjK6M-L';

    // Функция для получения IP-адреса с помощью стороннего API
    function getIP() {
        return fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => data.ip)
            .catch(error => {
                console.error('Ошибка при получении IP-адреса:', error);
                return 'Не удалось получить IP';
            });
    }

    // Функция для отправки сообщения в Discord
    function sendDiscordMessage(ip, userAgent) {
        const payload = {
            content: `Новый пользователь зашел на сайт!\nIP: ${ip}\nБраузер: ${userAgent}`,
            username: 'Сайт Визитка', // Это имя, которое будет отображаться
        };

        // Отправка POST-запроса на вебхук Discord
        fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Сообщение отправлено в Discord:', data);
        })
        .catch(error => {
            console.error('Ошибка при отправке сообщения в Discord:', error);
        });
    }

    // Получаем данные IP и браузера и отправляем сообщение
    getIP().then(ip => {
        const userAgent = navigator.userAgent;
        sendDiscordMessage(ip, userAgent);
    });

    // Функция для случайного размещения кнопки
    function setRandomButtonPosition() {
        // Получаем размеры экрана
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Случайные координаты для кнопки (не выходим за границы экрана)
        const randomX = Math.random() * (screenWidth - 150); // 150 - ширина кнопки
        const randomY = Math.random() * (screenHeight - 50); // 50 - высота кнопки

        // Применяем случайные значения к кнопке
        verificationDiv.style.left = randomX + 'px';
        verificationDiv.style.top = randomY + 'px';
    }

    // Устанавливаем случайную позицию кнопки при загрузке страницы
    setRandomButtonPosition();

    // Обработчик клика по кнопке "Я человек"
    verificationButton.addEventListener('click', function () {
        // Убираем фон
        overlay.classList.add('hidden');

        // Показываем визитку с плавным переходом
        profileCard.classList.add('visible');

        // Запускаем музыку
        audio.play().catch(error => {
            // Если аудио не запускается, выводим сообщение в консоль
            console.log('Автозапуск не разрешен. Попробуйте снова.');
        });

        // Убираем кнопку после нажатия
        verificationDiv.style.display = 'none';
    });

    // Сброс таймера при любом взаимодействии пользователя (клик, движение мыши)
    document.body.addEventListener('click', resetSessionTimer);
    document.body.addEventListener('mousemove', resetSessionTimer);
    document.body.addEventListener('keydown', resetSessionTimer);

    // Функция сброса таймера
    function resetSessionTimer() {
        // Теперь не будет блокировать сайт, убрали таймер
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showCopyNotification('Скопировано');
    }).catch(err => {
        console.error('Не удалось скопировать текст: ', err);
    });
}

function showCopyNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('copy-notification');
    notification.textContent = message;

    // Находим иконку Discord, чтобы позиционировать уведомление относительно нее
    const discordIcon = document.querySelector('.social-buttons .discord img');
    
    // Если иконка Discord найдена, позиционируем уведомление ниже нее
    if (discordIcon) {
        const discordIconRect = discordIcon.getBoundingClientRect();
        notification.style.left = discordIconRect.left + discordIconRect.width / 2 - notification.offsetWidth / 2 + 'px';
        notification.style.top = discordIconRect.top + discordIconRect.height + 5 + 'px'; // 5px отступ снизу
    }

    // Добавляем уведомление в тело документа
    document.body.appendChild(notification);

    // Убираем уведомление через 3 секунды
    setTimeout(() => {
        notification.remove();
    }, 3000); // 3 секунды
}
