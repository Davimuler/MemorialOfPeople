const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Google OAuth client setup
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Верификация Google токена
const verifyToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Ваш Google Client ID
    });
    return ticket.getPayload(); // Возвращаем payload, содержащий информацию о пользователе
};

// User registration
const registerUser = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // New user creation
        const user = new User({ firstName, lastName, email, phoneNumber, password });
        await user.save();

        // JWT token creation
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(201).json({
            token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User log in
const authUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Wrong input data' });
        }

        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Wrong input data' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.json({
            token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Google login
const googleLogin = async (req, res) => {
    const { token } = req.body;  // Получаем токен от клиента
    try {
        const payload = await verifyToken(token); // Верифицируем токен Google

        let user = await User.findOne({ googleId: payload.sub });

        if (!user) {
            // Если пользователь не найден, создаем нового
            user = new User({
                googleId: payload.sub,
                firstName: payload.given_name,
                lastName: payload.family_name,
                email: payload.email,
                profilePicture: payload.picture,  // Сохраняем фото профиля
            });
            await user.save(); // Сохраняем нового пользователя в базе данных
        }

        // Генерируем JWT для авторизованного пользователя
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(200).json({
            token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture,  // Отправляем фото профиля
            }
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { registerUser, authUser, googleLogin };
