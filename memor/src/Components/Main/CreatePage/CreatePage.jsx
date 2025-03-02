import React, {useContext, useState} from "react";
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
import axios from "axios";
import { useSelector } from "react-redux";
import { storage, ref, uploadBytes, getDownloadURL } from "../../../firebase";
import {Context} from "../../../index";
import { addDoc,getDocs, collection } from "firebase/firestore";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function CreatePage() {

    const handleFileUpload = async (file) => {
        try {
            // Создаем ссылку на файл в Storage
            const storageRef = ref(storage, `C:/User/Давид/Desktop/MarketPlaces/Бетон/1.o1-OBra4D7a4r82zxFSpKbykDbAwp42--KINtD6vB7w4(1)}`);

            // Загружаем файл
            await uploadBytes(storageRef, file);

            // Получаем URL загруженного файла
            const fileURL = await getDownloadURL(storageRef);

            console.log("Файл загружен. URL:", fileURL);
            return fileURL; // Возвращаем URL файла
        } catch (error) {
            console.error("Ошибка при загрузке файла:", error);
            return null;
        }
    };

    const fetchData = async () => {
        try {
            // Создаем ссылку на коллекцию "profiles"
            const profilesCollection = collection(firestore, "messages");

            // Получаем все документы из коллекции
            const querySnapshot = await getDocs(profilesCollection);

            // Преобразуем данные в массив
            const profiles = querySnapshot.docs.map((doc) => ({
                id: doc.id, // ID документа
                ...doc.data(), // Данные документа
            }));

            console.log("Данные из Firestore:", profiles);
            return profiles;
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
            return [];
        }
    };

    const {firestore,auth}=useContext(Context)
    const userR = useSelector((state) => state.auth.user);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const handleClick = async () => {
        try {
            await firestore.collection('messages').add({
                text: "Privet"
            });
            console.log("Message added successfully");
        } catch (error) {
            console.error("Error adding message: ", error);
        }
    };
    const [profile, setProfile] = useState({
        name: "",
        quote: "",
        description: "",
        mainPhoto: "",
        gallery: [],
        birthDay: "",
        birthMonth: "",
        birthYear: "",
        _id: userR._id
    });
    const addData = async () => {
        try {
            const docRef = await addDoc(collection(firestore, 'messages'), {
                text: 'Привет, Firestore!',
            });
            console.log('Документ добавлен с ID: ', docRef.id);
        } catch (error) {
            console.error('Ошибка при добавлении документа: ', error);
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = async (e, type) => {
        const file = e.target.files[0]; // Получаем выбранный файл
        if (file) {
            try {
                // Создаем ссылку на файл в Firebase Storage
                const storageRef = ref(storage, `profilePhotos/${file.name}`);

                // Загружаем файл в Firebase Storage
                await uploadBytes(storageRef, file);

                // Получаем URL загруженного файла
                const photoURL = await getDownloadURL(storageRef);

                // Обновляем состояние профиля в зависимости от типа (основное фото или галерея)
                if (type === "main") {
                    setProfile({ ...profile, mainPhoto: photoURL });
                } else {
                    setProfile({ ...profile, gallery: [...profile.gallery, photoURL] });
                }

                console.log("Файл успешно загружен. URL:", photoURL);
            } catch (error) {
                console.error("Ошибка при загрузке файла:", error);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/profile", profile, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setSnackbarMessage("Профіль успішно створено!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            console.log("Профіль створено:", response.data);
        } catch (error) {
            console.error("Помилка при створенні профілю:", error.response?.data || error.message);
            setSnackbarMessage("Помилка при створенні профілю: " + (error.response?.data?.message || error.message));
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
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
            <Button sx={{
                backgroundColor: '#1E90FF',
                color: '#fff',
                borderRadius: '10px',
                '&:hover': {
                    backgroundColor: '#00BFFF',
                },
            }} variant="contained" color="primary" onClick={handleFileUpload}>
                Dfa
            </Button>
        </Container>
    );
}

export default CreatePage;