import React, {useState} from 'react';
import {Box, Card, CardContent, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



function LinkedCreatedProfileCards(props) {
    const [cards, setCards] = useState([
        {
            id: 1,
            mainPhoto: "https://img.freepik.com/premium-photo/caucasian-man-with-blonde-hair-sitting-floor-studio-posing-blue-wall_129180-1029.jpg",
            quote: "Ця людина залишила слід у наших серцях...",
            name: "Іван Петрович Іванов",
            description: "Людина з добрим серцем, яка завжди допомагала іншим. Його мудрість і доброта назавжди залишаться в пам'яті близьких...",
        },
        {
            id: 2,
            mainPhoto: "https://img.freepik.com/free-photo/expressive-redhead-bearded-man_176420-32277.jpg",
            quote: "Він був прикладом для всіх нас...",
            name: "Петро Сергійович Петров",
            description: "Людина з сильним характером і доброю душею. Його посмішка запам'ятається нам назавжди.",
        },
    ]);

    const handleEdit = (id) => {
        console.log('Редагувати картку з id:', id);
    };

    const handleDelete = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    return (
        <Grid container spacing={3}>
            {cards.map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card.id}>
                    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                        <CardMedia component="img" height="200" image={card.mainPhoto} alt="Головне фото" />
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                {card.name}
                            </Typography>
                            <Typography variant="body1" sx={{ fontStyle: "italic", color: "gray", mt: 1 }}>
                                "{card.quote}"
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                                {card.description}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                            <IconButton onClick={() => handleEdit(card.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(card.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default LinkedCreatedProfileCards;