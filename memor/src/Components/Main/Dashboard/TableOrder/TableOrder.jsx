import React, {useState} from 'react';
import {Box, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";


function TableOrder(props) {

    const [tabletSize, setTabletSize] = useState('10x15'); // Розмір таблички
    const [deliveryAddress, setDeliveryAddress] = useState(''); // Адреса доставки
    const [paymentMethod, setPaymentMethod] = useState('card'); // Спосіб оплати

    const handleOrderQRTablet = () => {
        // Заглушка для оформлення замовлення
        if (deliveryAddress && tabletSize && paymentMethod) {
            props.setSnackbarMessage("Замовлення на QR-табличку успішно оформлено");
            props.setSnackbarSeverity("success");
            props.setSnackbarOpen(true);
        } else {
            props.setSnackbarMessage("Будь ласка, заповніть всі поля");
            props.setSnackbarSeverity("error");
            props.setSnackbarOpen(true);
        }
    };
    return (
        <Card sx={{ p: 2, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Замовлення QR-таблички</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                    <InputLabel>Розмір таблички</InputLabel>
                    <Select
                        value={tabletSize}
                        label="Розмір таблички"
                        onChange={(e) => setTabletSize(e.target.value)}
                    >
                        <MenuItem value="10x15">10x15 см</MenuItem>
                        <MenuItem value="15x20">15x20 см</MenuItem>
                        <MenuItem value="20x30">20x30 см</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Адреса доставки"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel>Спосіб оплати</InputLabel>
                    <Select
                        value={paymentMethod}
                        label="Спосіб оплати"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <MenuItem value="card">Картка</MenuItem>
                        <MenuItem value="paypal">PayPal</MenuItem>
                        <MenuItem value="googlepay">Google Pay</MenuItem>
                        <MenuItem value="applepay">Apple Pay</MenuItem>
                    </Select>
                </FormControl>
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
                    onClick={handleOrderQRTablet}
                >
                    Оформити замовлення
                </Button>
            </Box>
        </Card>
    );
}

export default TableOrder;