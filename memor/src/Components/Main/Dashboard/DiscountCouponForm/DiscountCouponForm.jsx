import React, { useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';

function DiscountCouponForm(props) {
    const [discountCode, setDiscountCode] = useState(''); // Поле для введення купона на знижку

    const handleApplyDiscount = () => {
        // Заглушка для застосування купона на знижку
        if (discountCode) {
            props.setSnackbarMessage("Купон на знижку застосовано");
            props.setSnackbarSeverity("success");
            props.setSnackbarOpen(true);
        } else {
            props.setSnackbarMessage("Будь ласка, введіть код купона");
            props.setSnackbarSeverity("error");
            props.setSnackbarOpen(true);
        }
    };

    return (
        <Card sx={{ p: 2, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Купон на знижку
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    label="Введіть код купона"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
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
                    onClick={handleApplyDiscount}
                >
                    Застосувати
                </Button>
            </Box>
        </Card>
    );
}

export default DiscountCouponForm;