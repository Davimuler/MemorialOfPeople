import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Context } from "../../../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { auth } = useContext(Context);

    const RegWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);

            const response = await axios.post('http://localhost:5000/api/auth/google', {
                accessToken: user.accessToken,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });

            if (response.data.success) {
                setSuccessMessage('Реєстрація через Google успішна!');
                setError('');
            } else {
                setError('Помилка реєстрації через Google');
            }
        } catch (err) {
            console.error("Помилка реєстрації через Google:", err);
            setError('Помилка реєстрації через Google');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

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
                setError('');
            } else {
                setError("Сталася помилка при реєстрації");
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Помилка при відправці даних:', error);

            if (error.response && error.response.status === 400) {
                setError("Користувач з таким email вже існує");
            } else {
                setError("Не вдалося зв'язатися з сервером.");
            }
            setSuccessMessage('');
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
                        onClick={RegWithGoogle}
                    >
                        <GoogleIcon />
                        <Typography variant="body1">Реєстрація через Google</Typography>
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
                    Вже є акаунт? <a href="/login" style={{ color: '#1E90FF', textDecoration: 'none' }}>Увійдіть тут</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default Registration;