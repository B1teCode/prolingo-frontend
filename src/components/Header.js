import React from 'react';
import Navbar from './Navbar';
import './style/header.css';
import header_gif from './img/header-entrance.gif';

function Header() {
  return (
    <div className='header'>
      <Navbar />
      <div className='header-site'>
        <div className='center header-flex'>
          <div className='header-content'>
            <h1>ProLingo</h1>
            <h3>Учись говорить, учись кодить</h3>
            <p>Откройте новые горизонты с нами —<br /> учитесь легко и эффективно.</p>
            <a href='#apply'>Оставить заявку</a>
          </div>
          <div className='header-gif'><img src={header_gif}/></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
