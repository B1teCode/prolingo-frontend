import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/Courses.css';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', name_course: '' });
    const [agreement, setAgreement] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const baseURL = 'https://prolingo.pythonanywhere.com'; // Замените на URL вашего продакшн сервера

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseURL}/api/courses/`);
                setCourses(response.data);
            } catch (error) {
                setErrorMessage('Ошибка при загрузке данных курсов');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            setFormData((prevData) => ({
                ...prevData,
                name_course: selectedCourse.name,
            }));
        }
    }, [selectedCourse]);

    const openModal = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCourse(null);
        setModalOpen(false);
        setFormData({ name: '', phone: '', name_course: '' });
        setAgreement(false);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleAgreementChange = () => {
        setAgreement(!agreement);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            await axios.post(`${baseURL}/api/applications/`, formData);
            setSuccessMessage('Ваша заявка успешно отправлена!');
            setFormData({ name: '', phone: '', name_course: '' });
            setAgreement(false);
        } catch (error) {
            setErrorMessage('Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="courses" id="courses">
            <h2>Курсы</h2>
            {loading ? (
                <div className="loading-spinner">Загрузка...</div>
            ) : (
                <div className="cards center">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <div className="card" key={course.id}>
                                <div className="card-image">
                                    {course.photo_cover ? (
                                        <img src={`${baseURL}${course.photo_cover}`} alt={course.name} />
                                    ) : (
                                        <i className="fas fa-image"></i>
                                    )}
                                </div>
                                <div className="card-content">
                                    <h3 className="card-heading">{course.name}</h3>
                                    <p className="card-description">
                                        {course.description.length > 80
                                            ? `${course.description.slice(0, 80)}...`
                                            : course.description}
                                    </p>
                                    <p className="card-duration">Продолжительность: {course.duration}</p>
                                    <p className="card-price">Цена: {course.price} руб.</p>
                                    {course.age_restriction && (
                                        <p className="card-age">Возрастное ограничение: {course.age_restriction}</p>
                                    )}
                                </div>
                                <button className="card-action" onClick={() => openModal(course)}>
                                    Подробнее
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className='not-courses'>К сожалению курсы ещё не добавлены 😔</p>
                    )}
                </div>
            )}

            {modalOpen && selectedCourse && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className='mod-flex'>
                            <img src={`${baseURL}${selectedCourse.photo_cover}`} alt={selectedCourse.name} className="modal-image" />
                            <aside>
                                <h2>{selectedCourse.name}</h2>
                                <div className='modal-additional-photos'>
                                    {selectedCourse.photo1 && <img src={`${baseURL}${selectedCourse.photo1}`} alt="Дополнительное фото 1" className="modal-additional-photo" />}
                                    {selectedCourse.photo2 && <img src={`${baseURL}${selectedCourse.photo2}`} alt="Дополнительное фото 2" className="modal-additional-photo" />}
                                    {selectedCourse.photo3 && <img src={`${baseURL}${selectedCourse.photo3}`} alt="Дополнительное фото 3" className="modal-additional-photo" />}
                                </div>
                            </aside>
                        </div>
                        <p className='mod-description'><strong>Описание курса:</strong> {selectedCourse.description}</p>
                        <article>
                            <p><strong>Продолжительность:</strong> {selectedCourse.duration}</p>
                            <p><strong>Цена:</strong> {selectedCourse.price} руб.</p>
                            {selectedCourse.age_restriction && (
                                <p><strong>Возрастное ограничение:</strong> {selectedCourse.age_restriction}</p>
                            )}
                        </article>

                        <form className="form" onSubmit={handleSubmit}>
                            <h4 className="form-heading">Оставить заявку</h4>
                            <div className='form-flex'>
                                <div className="form-group fg">
                                    <label htmlFor="name">Ваше имя *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Введите ваше имя"
                                        required
                                    />
                                </div>
                                <div className="form-group fg">
                                    <label htmlFor="phone">Ваш телефон *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Введите ваш телефон"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group agreement">
                                <input
                                    type="checkbox"
                                    id="agreement"
                                    checked={agreement}
                                    onChange={handleAgreementChange}
                                />
                                <label htmlFor="agreement">
                                    Я даю согласие на обработку моих персональных данных в соответствии с политикой конфиденциальности
                                </label>
                            </div>
                            <button type="submit" className="submit-button" disabled={!agreement || isSubmitting}>
                                {isSubmitting ? 'Отправка...' : 'Отправить'}
                            </button>
                            {successMessage && <p className="success-message">{successMessage}</p>}
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Courses;
