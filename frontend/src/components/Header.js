import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { profileIntro } from '../img';
import { cleanLocalStore } from '../services/localStore';

function Header({ nome }) {
  const navigate = useNavigate();

  const logout = () => {
    cleanLocalStore()
    navigate('/')
  }

  return(
    <header className='d-flex align-items-start justify-content-between px-4 header'>
      <div className='d-flex flex-row align-items-end'>
        <img alt="loading" src={profileIntro} width={150} height={150}/>
        <span>{nome}</span>
      </div>
      <button
        className='btn btn-dark mt-2'
        type='button'
        onClick={logout}
      >
        SAIR
      </button>
    </header>
  );
}

export default Header;