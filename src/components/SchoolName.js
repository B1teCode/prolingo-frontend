import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SchoolName = () => {
    const [schoolNames, setSchoolNames] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/school/')
            .then(response => {
                setSchoolNames(response.data);  // Сохраняем весь массив данных
            })
            .catch(error => {
                console.error('Ошибка при получении названий школ:', error);
            });
    }, []);

    return (
        <div>
            <h1>Названия школ:</h1>
            <ul>
                {schoolNames.map((school, index) => (
                    <li key={index}>{school.name}</li>  // Отображаем все названия в виде списка
                ))}
            </ul>
        </div>
    );
};

export default SchoolName;
