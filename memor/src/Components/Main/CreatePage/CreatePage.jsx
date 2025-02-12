import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    CardMedia,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function CreatePage({ onSave }) {
    const [profile, setProfile] = useState({
        name: "",
        quote: "",
        description: "",
        mainPhoto: "",
        gallery: [],
        birthDay: "",
        birthMonth: "",
        birthYear: "",
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === "main") {
                    setProfile({ ...profile, mainPhoto: reader.result });
                } else {
                    setProfile({ ...profile, gallery: [...profile.gallery, reader.result] });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        onSave(profile);
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
        "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}>
                СТВОРЕННЯ СТОРІНКИ ПАМ'ЯТІ
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textAlign: "left" }}>
                ПАМ'ЯТНЕ ФОТО
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <label htmlFor="main-photo-upload">
                    <input
                        type="file"
                        accept="image/*"
                        id="main-photo-upload"
                        hidden
                        onChange={(e) => handlePhotoUpload(e, "main")}
                    />
                    {profile.mainPhoto ? (
                        <CardMedia
                            component="img"
                            src={profile.mainPhoto}
                            sx={{
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                cursor: "pointer",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f0f0f0",
                                cursor: "pointer",
                            }}
                        >
                            <IconButton color="gray" component="span">
                                <PhotoCameraIcon sx={{ color: "gray" }} />
                            </IconButton>
                        </Box>
                    )}
                </label>
                <Typography variant="body1" sx={{ color: "gray", flexGrow: 1, textAlign: "left", marginLeft: "20px" }}>
                    Виберіть найкраще фото натиснивши на іконку лівіше, фото буде відображене на початку пам'ятної сторінки
                </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>Прізвище ім'я по-батькові</Typography>
            <TextField
                label="Шевченко Олександр Андрійович"
                name="name"
                fullWidth
                value={profile.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>Дата народження</Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel>День</InputLabel>
                    <Select
                        value={profile.birthDay}
                        label="День"
                        onChange={(e) => setProfile({ ...profile, birthDay: e.target.value })}
                    >
                        {days.map((day) => (
                            <MenuItem key={day} value={day}>{day}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Місяць</InputLabel>
                    <Select
                        value={profile.birthMonth}
                        label="Місяць"
                        onChange={(e) => setProfile({ ...profile, birthMonth: e.target.value })}
                    >
                        {months.map((month, index) => (
                            <MenuItem key={index} value={month}>{month}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Рік</InputLabel>
                    <Select
                        value={profile.birthYear}
                        label="Рік"
                        onChange={(e) => setProfile({ ...profile, birthYear: e.target.value })}
                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>Епітафія</Typography>
            <TextField
                label="Ваша епітафія"
                name="quote"
                fullWidth
                value={profile.quote}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <Typography variant="body1" sx={{ mb: 1, textAlign: "left" }}>Пам'ятні слова</Typography>
            <TextField
                name="description"
                fullWidth
                multiline
                rows={8}
                value={profile.description}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            <Typography variant="body1" sx={{ mt: 4 }}>QR-код посилання на цю сторінку</Typography>
            <Box sx={{ mt: 2, p: 2, border: "1px solid lightgray", borderRadius: 2, display: "inline-block" }}>
                <QRCodeSVG value={window.location.href} size={128} />
            </Box>

            <Box sx={{ mt: 4, textAlign: "center", mb: 4 }}>
                <Button sx={{
                    backgroundColor: '#1E90FF',
                    color: '#fff',
                    borderRadius: '10px',
                    '&:hover': {
                        backgroundColor: '#00BFFF',
                    },
                }} variant="contained" color="primary" onClick={handleSubmit}>
                    Створити сторінку
                </Button>
            </Box>
        </Container>
    );
}

export default CreatePage;