const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const accessToken = 'vk1.a.wCUFqT_tt-BQ9CjSKXPPDfoPDJnUYESPhfJ_bcN8nN2Op2Z3PL-mOflE_KR9fBcLzOEkJlj7f5Qia2xOwUyXBzSG07gJzFeMDUylsxntkY3EuusnJr3MVsAVftEoF2-AJkUqQliv60oR-JOTmtCPnj3dKEtVhgdti__4rRbSpvVlHQVhmoIXedJw8NXalF43HMXhQkaTqwsRiSABRjZEKg'
// Локальная переменная для хранения данных
let conversationMembers = null;

// Функция для запроса данных
async function fetchData() {
    try {
        const response = await axios.get('https://api.vk.com/method/messages.getConversationMembers', {
            params: {
                peer_id: '2000000002',
                fields: 'photo_400_orig',
                access_token: accessToken, // Замените на ваш токен доступа
                v: '5.131'
            }
        });
        conversationMembers = response.data; // Сохранение данных в локальную переменную
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

// Маршрут для получения данных из локальной переменной
app.get('/get-members', (req, res) => {
    if (conversationMembers) {
        res.json(conversationMembers);
    } else {
        res.status(404).send('Данные не найдены');
    }
});

// Запуск запроса данных при запуске сервера
fetchData();

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});