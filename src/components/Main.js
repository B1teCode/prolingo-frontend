import React from 'react';
import SchoolName from './SchoolName';
import FeedbackForm from './FeedbackForm';
import Courses from './Courses';
import './style/Main.css'
import './style/Courses.css'
import logo from './img/logo-white.png'; // Импорт логотипа


function Main() {
    return (
        <div className='main'>
            <div className='pad' id='about'>
                <div className='about'>
                    <div className='center about-flex'>
                        <div className='about-content'>
                            <h2>О нас</h2>
                            <p>Наша школа — это место, где обучение встречается с инновациями и индивидуальным подходом к каждому ученику. Мы предлагаем курсы английского языка и программирования для детей и взрослых, которые помогут вам и вашим детям обрести уверенность в знаниях и навыках, необходимых в современном мире.</p>
                            <a href='#apply'>Оставить заявку</a>
                        </div>
                        <div className='about-content mission-content'>
                            <h2>Наша миссия</h2>
                            <p>Мы верим, что образование — это ключ к личному и профессиональному успеху. Наша миссия — предоставлять качественные и доступные образовательные программы, которые помогут каждому раскрыть свой потенциал и достигнуть новых высот.</p>
                            <a href='#apply'>Оставить заявку</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Курсы */}
            <Courses />
            {/* Форма обратной связи */}
            <FeedbackForm />
            {/* <SchoolName /> */}
            {/* Футер */}
            <footer className="footer" id='contact'>
                <div className="footer-content">
                    <img src={logo} alt="Логотип" className="footer-logo" />
                    <div className="footer-contacts">
                        <h4>Контакты</h4>
                        <p>Телефон: +7 (999) 123-45-67</p>
                        <p>Email: info@example.com</p>
                        <div className="footer-socials">
                            <a href="https://t.me/yourprofile" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-telegram"></i>
                            </a>
                            <a href="https://vk.com/yourprofile" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-vk"></i>
                            </a>
                            <a href="https://wa.me/79991234567" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                    <div className="footer-address">
                        <h4>Адрес</h4>
                        <p>г. Москва, ул. Примерная, 123</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Main;
