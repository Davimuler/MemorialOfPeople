import React, { useState } from 'react';
import {
    Container,
    Typography,
    Card,
    Box,
    Button,
    Avatar,
    TextField,
    Snackbar,
    Alert,
} from '@mui/material';
import { useSelector } from 'react-redux';
import TableOrder from "./TableOrder/TableOrder";
import PaymentHistory from "./PaymentHistory/PaymentHistory";
import AccountSettings from "./AccountSettings/AccountSettings";
import SupportContacts from "./SupportContacts/SupportContacts";
import DiscountCouponForm from "./DiscountCouponForm/DiscountCouponForm";
import LinkedCreatedProfileCards from "./LinkedCreatedProfileCards/LinkedCreatedProfileCards";

const Dashboard = () => {
    const userR = useSelector((state) => state.auth.user);

    // Використовуємо дані з Redux замість мокових даних
    const [user, setUser] = useState({
        name: userR.displayName || "Олександр Смирнов",
        email: userR.email || "alex@example.com",
        profilePhoto: userR.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScDf_Ep1nSHETPKv6j2oDp1DrM-FePAz2XEA&s",
        isPartner: true,
        referralCode:userR.referralCode || "",
        referralCount: 0,
    });
console.log(userR)

    const [openPartnerForm, setOpenPartnerForm] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [partnerCompany, setPartnerCompany] = useState('');
    const [partnerServices, setPartnerServices] = useState('');

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleBecomePartner = () => {
        // Заглушка для запиту на партнерство
        if (partnerCompany && partnerServices) {
            setSnackbarMessage("Запит на партнерство відправлено");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setOpenPartnerForm(false); // Закрити форму після успішної відправки
        } else {
            setSnackbarMessage("Будь ласка, заповніть всі поля");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    // Генерація реферального купона
    const generateReferralCode = () => {
        const newReferralCode = `PARTNER${Math.floor(Math.random() * 10000)}`; // Генеруємо випадковий код
        setUser({ ...user, referralCode: newReferralCode }); // Оновлюємо стан користувача
        setSnackbarMessage("Персональний купон успішно згенеровано");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
    };

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                Особистий кабінет
            </Typography>

            {/* Інформація про користувача */}
            <Card sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 4, boxShadow: 3, borderRadius: 3 }}>
                <Avatar src={user.profilePhoto} sx={{ width: 80, height: 80, mr: 2 }} />
                <Box textAlign="left">
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                    {user.isPartner && (
                        <Box sx={{ mt: 1 }}>
                            {user.referralCode ? (
                                <>
                                    <Typography variant="body2" color="text.secondary">
                                        Ваш реферальний купон: <strong>{user.referralCode}</strong>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        Кількість використань вашого купона: <strong>{user.referralCount}</strong>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                                        Кожен користувач, який введе ваш реферальний купон, отримає персональну знижку!
                                    </Typography>
                                </>
                            ) : (
                                <Button
                                    sx={{
                                        backgroundColor: '#1E90FF',
                                        color: '#fff',
                                        borderRadius: '10px',
                                        whiteSpace: 'nowrap',
                                        mt: 1,
                                        '&:hover': {
                                            backgroundColor: '#00BFFF',
                                        },
                                    }}
                                    onClick={generateReferralCode}
                                >
                                    Згенерувати персональний купон
                                </Button>
                            )}
                        </Box>
                    )}
                </Box>
            </Card>

            {/* Поле для введення купона на знижку (для всіх користувачів) */}
           <DiscountCouponForm setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity}/>

            {/* Інтерфейс для оформлення замовлення на QR-табличку */}
            <TableOrder setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity}/>

            {/* Історія платежів */}
          <PaymentHistory/>

            {/* Картки померлих близьких */}
            <LinkedCreatedProfileCards/>

            {/* Налаштування акаунта */}
           <AccountSettings setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity}/>

            {/* Форма "Стати партнером" */}
            {!user.isPartner && (
                <Card sx={{ p: 2, mt: 4, mb: 4, boxShadow: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">Стати партнером</Typography>
                    {openPartnerForm ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Назва компанії"
                                value={partnerCompany}
                                onChange={(e) => setPartnerCompany(e.target.value)}
                            />
                            <TextField
                                label="Послуги"
                                value={partnerServices}
                                onChange={(e) => setPartnerServices(e.target.value)}
                            />
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
                                onClick={handleBecomePartner}
                            >
                                Відправити запит на партнерство
                            </Button>
                            <Button
                                sx={{
                                    backgroundColor: '#FF5722',
                                    color: '#fff',
                                    borderRadius: '10px',
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        backgroundColor: '#FF4500',
                                    },
                                }}
                                onClick={() => setOpenPartnerForm(false)}
                            >
                                Скасувати
                            </Button>
                        </Box>
                    ) : (
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
                            onClick={() => setOpenPartnerForm(true)}
                        >
                            Стати партнером
                        </Button>
                    )}
                </Card>
            )}
            {/* Контакти техпідтримки */}
           <SupportContacts/>
            {/* Снекбар для повідомлень */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Dashboard;