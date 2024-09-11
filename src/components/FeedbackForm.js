import React, { useState } from 'react';
import axios from 'axios';
import './style/FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    name_course: 'Курс не выбран',
  });
  const [agreement, setAgreement] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAgreementChange = () => {
    setAgreement((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await axios.post('https://prolingo.pythonanywhere.com/api/applications/', formData);
      setSuccessMessage('Ваша заявка успешно отправлена!');
      setFormData({ name: '', phone: '', message: '', name_course: 'Курс не выбран' });
      setAgreement(false);
    } catch (error) {
      const errorMessage = error.response?.status === 400
        ? 'Ошибка при отправке заявки. Проверьте правильность введенных данных.'
        : 'Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.';
      setErrorMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="center">
      <form className="feedback-form" id="apply" onSubmit={handleSubmit}>
        <h2 className="form-heading">Оставить заявку</h2>
        <div className="form-flex">
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
        <div className="form-group fgt">
          <label htmlFor="message">Сообщение</label>
          <textarea
            id="message"
            rows={7}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Введите ваше сообщение (необязательно)"
          />
        </div>
        <div className="form-group agreement">
          <input
            type="checkbox"
            id="agreement"
            checked={agreement}
            onChange={handleAgreementChange}
          />
          <label htmlFor="agreement">
            Я даю согласие на обработку моих персональных данных в соответствии с политикой
            конфиденциальности
          </label>
        </div>
        <button type="submit" className="submit-button" disabled={!agreement || isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default FeedbackForm;
