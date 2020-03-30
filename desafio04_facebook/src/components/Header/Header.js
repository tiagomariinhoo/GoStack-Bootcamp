import React from 'react';
import perfilIcon from '../../assets/perfil_icon.png';
import Persona from '../../assets/persona.png';
import './Header.css';

function Header() {
  return (
    <header>
        <img src="https://i.imgur.com/KDIDiSE.png" />
        <div>
          <span>Meu perfil</span>
          <img src = {Persona} />
        </div>
    </header>
  );
}

export default Header;