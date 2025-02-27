import React, { useState } from "react";
import axios from "axios";

const FileUploader = () => {
    const [file, setFile] = useState(null); // Состояние для хранения выбранного файла
    const [isUploading, setIsUploading] = useState(false); // Состояние для индикатора загрузки
    const [message, setMessage] = useState(""); // Состояние для сообщений

    // Обработчик выбора файла
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Обработчик загрузки файла
    const handleUpload = async () => {
        if (!file) {
            setMessage("Пожалуйста, выберите файл.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); // Добавляем файл в FormData

        setIsUploading(true);
        setMessage("");

        try {
            // Отправляем файл на сервер
            const response = await axios.post("http://localhost:5000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Указываем тип контента
                },
            });

            setMessage(response.data.message); // Сообщение об успешной загрузке
        } catch (error) {
            console.error("Ошибка загрузки файла:", error);
            setMessage("Ошибка загрузки файла.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Загрузка фото на Google Drive</h1>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button
                onClick={handleUpload}
                disabled={isUploading}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: isUploading ? "#ccc" : "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                {isUploading ? "Загрузка..." : "Загрузить"}
            </button>
            {message && <p style={{ marginTop: "10px", color: message.includes("успешно") ? "green" : "red" }}>{message}</p>}
        </div>
    );
};

export default FileUploader;