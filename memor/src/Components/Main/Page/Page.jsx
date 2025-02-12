import React, { useState } from 'react';
import { Container, Typography, Card, CardMedia, CardContent, Box, IconButton, Grid } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';

function Page() {
    const profile = {
        mainPhoto: "https://img.freepik.com/premium-photo/caucasian-man-with-blonde-hair-sitting-floor-studio-posing-blue-wall_129180-1029.jpg",
        quote: "Этот человек оставил след в наших сердцах...",
        gallery: [
            "https://img.freepik.com/free-photo/expressive-redhead-bearded-man_176420-32277.jpg",
            "https://img.freepik.com/free-photo/handsome-young-cheerful-man-with-arms-crossed_171337-1073.jpg",
            "https://img.freepik.com/free-photo/smiley-man-with-arms-crossed-posing_23-2148306586.jpg?semt=ais_hybrid",
            "https://img.freepik.com/premium-photo/caucasian-man-with-blonde-hair-sitting-floor-studio-posing-blue-wall_129180-1029.jpg",
        ],
        name: "Иван Петрович Иванов",
        description: "Человек с добрым сердцем, который всегда помогал другим. Его мудрость и доброта навсегда останутся в памяти близких..."
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextPhoto = () => {
        if (currentIndex < profile.gallery.length - 2) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevPhoto = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const qrCodeValue = window.location.href;

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
            <CardMedia
                component="img"
                height="400"
                image={profile.mainPhoto}
                alt="Главное фото"
            />

            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                {profile.name}
            </Typography>

            <Typography variant="h5" sx={{ fontStyle: "italic", mt: 3, color: "gray" }}>
                "{profile.quote}"
            </Typography>

            <Box sx={{ mt: 4, position: 'relative' }}>
                <Grid container spacing={2} justifyContent="center">
                    {profile.gallery.slice(currentIndex, currentIndex + 2).map((photo, index) => (
                        <Grid item key={index} xs={6}>
                            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                                <CardMedia component="img" height="300" image={photo} alt={`Фото ${index}`} />
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <IconButton
                    onClick={prevPhoto}
                    disabled={currentIndex === 0}
                    sx={{
                        position: 'absolute',
                        left: -40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                    }}
                >
                    <ArrowBack />
                </IconButton>

                <IconButton
                    onClick={nextPhoto}
                    disabled={currentIndex >= profile.gallery.length - 2}
                    sx={{
                        position: 'absolute',
                        right: -40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                    }}
                >
                    <ArrowForward />
                </IconButton>
            </Box>

            <Card sx={{ boxShadow: 3, borderRadius: 3, mt: 4, p: 2 }}>
                <CardContent>
                    <Typography variant="body1" sx={{ color: "gray", fontSize: "1.2rem" }}>
                        {profile.description}
                    </Typography>
                </CardContent>
            </Card>

            <Box sx={{ mt: 4, mb: 2 }}>
                <Typography
                    variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                    Это код для этой страницы
                </Typography>
            </Box>

            <Box
                sx={{
                    mt: 4,
                    mb: 4,
                    p: 3,
                    border: '1px solid lightgray',
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: 'md',
                    margin: '0 auto',
                    boxShadow: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <QRCodeSVG
                    value={qrCodeValue}
                    size={256}
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            </Box>
        </Container>
    );
}

export default Page;