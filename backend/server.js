const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Импортируем CORS
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(express.json()); // Для обработки JSON в теле запроса
app.use(cors()); // Разрешаем все CORS-запросы

// Подключение к MongoDB без useNewUrlParser и useUnifiedTopology
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Подключено к MongoDB'))
    .catch((error) => console.error('Ошибка подключения:', error));

// Маршруты
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
