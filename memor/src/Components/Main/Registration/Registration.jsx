import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from "axios";  // импортируем axios для отправки запроса

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');  // Стейт для ошибок
    const [passwordError, setPasswordError] = useState('');  // Стейт для ошибки пароля
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        // Проверка на совпадение паролей сразу при вводе
        if (name === 'confirmPassword') {
            if (value !== formData.password) {
                setPasswordError("Паролі не збігаються!");
            } else {
                setPasswordError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Если пароли не совпадают, не отправляем данные
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Паролі не збігаються!");
            return;
        }

        const dataToSend = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', dataToSend);

            if (response.status === 201) {
                setSuccessMessage("Реєстрація успішна!");
            } else {
                alert("Сталася помилка при реєстрації");
            }
        } catch (error) {
            console.error('Помилка при відправці даних:', error);

            if (error.response && error.response.status === 400) {
                setError("Користувач з таким email вже існує");
            } else {
                setError("Не вдалося зв'язатися з сервером.");
            }
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
                    Реєстрація
                </Typography>
                {/* Отображаем ошибку, если она есть */}
                {error && <Typography sx={{ color: 'red', textAlign: 'center' }}>{error}</Typography>}
                {passwordError && <Typography sx={{ color: 'red', textAlign: 'center' }}>{passwordError}</Typography>}
                {successMessage && <Typography sx={{ color: 'green', textAlign: 'center' }}>{successMessage}</Typography>}

                {[
                    { label: "Ім'я", name: 'firstName' },
                    { label: 'Прізвище', name: 'lastName' },
                    { label: 'Email', name: 'email' },
                    { label: 'Номер телефона', name: 'phoneNumber' },
                    { label: 'Введіть пароль', name: 'password' },
                    { label: 'Підтвердіть пароль', name: 'confirmPassword' }
                ].map(({ label, name }, index) => (
                    <TextField
                        key={index}
                        label={label}
                        variant="standard"
                        fullWidth
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        type={label.includes('пароль') ? 'password' : 'text'}
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
                <Button
                    disabled={passwordError || formData.password !== formData.confirmPassword}
                    onClick={handleSubmit}
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
                >
                    Зареєструватися
                </Button>
                <Typography
                    sx={{
                        marginTop: 2,
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#555',
                    }}
                >
                    Вже є акаунт? <a href="/login" style={{ color: '#1E90FF', textDecoration: 'none' }}>Увійдіть тут</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default Registration;
