import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Context } from "../../../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch } from 'react-redux'; // Импортируем useDispatch
import { login } from '../../../redux/authSlice'; // Импортируем действие login из authSlice

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { auth } = useContext(Context); // Получаем auth из контекста
    const dispatch = useDispatch(); // Получаем dispatch из Redux

    const fetchUserData = async (email) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/getuser', {
                email: email,
            });
            // console.log(response.data.user)
            return response.data.user; // Предполагаем, что сервер возвращает данные пользователя
        } catch (err) {
            console.error("Помилка отримання даних користувача:", err);
            throw err;
        }
    };


    // Функция для входа через Google
    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setSuccess('Вхід через Google успішний!');
            setError('');

            // Запрашиваем данные пользователя с сервера
            const userData = await fetchUserData(user.email);
 console.log(userData)
            dispatch(login({
                _id:userData._id,
                uid: userData.uid,
                email: userData.email,
                displayName: userData.displayName,
                photoURL: userData.photoURL,
                referralCode: userData.referralCode,
            }));
        } catch (err) {
            console.error("Помилка входу через Google:", err);
            setError('Помилка авторизації через Google');
        }
    };

    // Функция для обычного входа
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            // Обработка успешного входа
            console.log(response.data);
            setSuccess('Вхід успішний!');
            setError('');

            // Сохраняем данные пользователя в Redux и localStorage
            dispatch(login({
                uid: response.data.user.id, // Предположим, что сервер возвращает ID пользователя
                email: response.data.user.email,
                displayName: response.data.user.name, // Предположим, что сервер возвращает имя
                photoURL: response.data.user.avatar, // Предположим, что сервер возвращает аватар
            }));
        } catch (err) {
            // Обработка ошибки
            setError('Невірні дані для входу');
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 5,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Вхід в аккаунт
                </Typography>
                {['Email', 'Пароль'].map((label, index) => (
                    <TextField
                        key={index}
                        label={label}
                        variant="standard"
                        fullWidth
                        type={label === 'Пароль' ? 'password' : 'text'}
                        value={label === 'Email' ? email : password}
                        onChange={(e) => label === 'Email' ? setEmail(e.target.value) : setPassword(e.target.value)}
                        InputProps={{
                            sx: {
                                '&:before': {
                                    borderBottom: '2px solid #ccc',
                                    transition: 'border-color 0.3s ease',
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: '2px solid #1E90FF',
                                },
                                '&.Mui-focused:before': {
                                    borderBottom: '2px solid #1E90FF',
                                },
                                '&:after': {
                                    borderBottom: '2px solid #1E90FF',
                                },
                            },
                        }}
                    />
                ))}
                {error && (
                    <Typography sx={{ fontSize: '14px', color: 'red', textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography sx={{ fontSize: '14px', color: 'green', textAlign: 'center' }}>
                        {success}
                    </Typography>
                )}
                <Typography
                    sx={{
                        fontSize: '14px',
                        color: '#1E90FF',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textAlign: 'right',
                    }}
                >
                    Забули пароль?
                </Typography>
                {/* Кнопка для обычного входа */}
                <Button
                    sx={{
                        backgroundColor: '#1E90FF',
                        color: '#fff',
                        borderRadius: '10px',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            backgroundColor: '#00BFFF',
                        },
                    }}
                    fullWidth
                    onClick={handleSubmit}
                >
                    Увійти
                </Button>
                {/* Иконка для входа через Google */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            border: '2px solid #1E90FF',
                            backgroundColor: 'transparent',
                            color: '#1E90FF',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: 'rgba(30, 144, 255, 0.1)',
                            },
                        }}
                        onClick={loginWithGoogle}
                    >
                        <GoogleIcon />
                        <Typography variant="body1">Вхід через Google</Typography>
                    </Button>
                </Box>
                <Typography
                    sx={{
                        marginTop: 2,
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#555',
                    }}
                >
                    Немає акаунту? <a href="/register" style={{ color: '#1E90FF', textDecoration: 'none' }}>Створити акаунт</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;