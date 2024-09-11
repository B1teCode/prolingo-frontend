import React, { useState, useEffect, useRef } from 'react';
import './style/Navbar.css'; // импортируйте стили, если необходимо
import logo from './img/logo-white-mini.png'; // Импорт логотипа

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const horiSelectorRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1000);

  // Функция для обновления позиции активного элемента
  const updateSelectorPosition = (index) => {
    const activeItem = document.querySelectorAll('#navbarSupportedContent .nav-item')[index];
    if (activeItem && horiSelectorRef.current) {
      const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = activeItem;
      horiSelectorRef.current.style.top = `${offsetTop}px`;
      horiSelectorRef.current.style.left = `${offsetLeft}px`;
      horiSelectorRef.current.style.height = `${offsetHeight}px`;
      horiSelectorRef.current.style.width = `${offsetWidth}px`;
    }
  };

  useEffect(() => {
    updateSelectorPosition(activeIndex);
    window.addEventListener('resize', () => updateSelectorPosition(activeIndex));
    return () => {
      window.removeEventListener('resize', () => updateSelectorPosition(activeIndex));
    };
  }, [activeIndex]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1000);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Проверка при загрузке компонента

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
    updateSelectorPosition(index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar navbar-expand-custom navbar-mainbg">
      {isLargeScreen ? (
        <div className="center vcenter">
          <a className="navbar-brand navbar-logo" href="#"><img src={logo} alt='logo'/></a>
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <i className="fas fa-bars text-white"></i>
          </button>
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <div className="hori-selector" ref={horiSelectorRef}>
                <div className="left"></div>
                <div className="right"></div>
              </div>
              {[
                { name: 'Главная', href: '#' },
                { name: 'О нас', href: '#about' },
                { name: 'Курсы', href: '#courses' },
                { name: 'Оставить заявку', href: '#apply' },
                { name: 'Контакты', href: '#contact' },
              ].map((item, index) => (
                <li
                  className={`nav-item ${activeIndex === index ? 'active' : ''}`}
                  key={index}
                  onClick={() => handleMenuClick(index)}
                >
                  <a className="nav-link" href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        // Альтернативный контент, если экран меньше 1000px
        <>
          <a className="navbar-brand navbar-logo" href="#"><img src={logo} alt='logo'/></a>
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <i className="fas fa-bars text-white"></i>
          </button>
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <div className="hori-selector" ref={horiSelectorRef}>
                <div className="left"></div>
                <div className="right"></div>
              </div>
              {[
                { name: 'Главная', href: '#home' },
                { name: 'О нас', href: '#about' },
                { name: 'Курсы', href: '#courses' },
                { name: 'Оставить заявку', href: '#apply' },
                { name: 'Контакты', href: '#contact' },
              ].map((item, index) => (
                <li
                  className={`nav-item ${activeIndex === index ? 'active' : ''}`}
                  key={index}
                  onClick={() => handleMenuClick(index)}
                >
                  <a className="nav-link" href={item.href}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
