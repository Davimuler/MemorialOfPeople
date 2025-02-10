import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Паролі не збігаються!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Реєстрація успішна!");
            } else {
                alert("Сталася помилка при реєстрації");
            }
        } catch (error) {
            console.error('Помилка при відправці даних:', error);
            alert("Не вдалося зв'язатися з сервером.");
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
                {["Ім'я", 'Прізвище', 'Email', 'Номер телефона', 'Введіть пароль', 'Підтвердіть пароль'].map((label, index) => (
                    <TextField
                        key={index}
                        label={label}
                        variant="standard"
                        fullWidth
                        name={label.toLowerCase().replace(/\s/g, '')} // Преобразуем метку в имя
                        value={formData[label.toLowerCase().replace(/\s/g, '')]}
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
