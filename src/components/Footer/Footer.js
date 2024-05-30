import React from 'react';
import "./Footer.scss";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer bg-orange'>
      <div className = "container py-4 text-center">
        <div className='flex align-center justify-center text-white fw-3 fs-14'>
          <Link to = "/" className='text-uppercase'>Política de privacidad</Link>
          <div className='vert-line'></div>
          <Link to = "/" className='text-uppercase'>Términos y condiciones</Link>
          <div className='vert-line'></div>
          <Link to = "/" className='text-uppercase'>Acerca de K&KShop.</Link>
        </div>
        <span className='text-white copyright-text text-manrope fs-14 fw-3'>&copy; 2024 K&KShop. Todos Los Derechos Reservados.</span>
      </div>
    </footer>
  )
}

export default Footer