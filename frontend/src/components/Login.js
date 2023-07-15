import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../services/fetchApi';
import { saveLocalStore } from '../services/localStore';
import { profile1, profile2, profile3, profile4, spinner } from '../img';

const imgProfile = [profile1, profile2, profile3, profile4]

function Login({ email, setEmail }) {
    const navigate = useNavigate();
    
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    

    const login = async () => {
        setIsLoading(true);
        const result = await auth(email);
        
        if (result.status === 'ativo') {
            saveLocalStore('email', email);
            saveLocalStore('nome', result.nome);
            return navigate('/home')
        };

        setIsValidEmail(false);
        setIsLoading(false);
    }

    return(
    <>
    <div className='login d-flex flex-column justify-content-end p-4'>
            <div className='img-profile'>
                <img alt="foto perfil" src={imgProfile[Math.floor((Math.random() * (4 - 0)) * 1)]}/>
            </div>
            <div className='input-group'>
                <span class="input-group-text" id="basic-addon1">@</span>
                <input
                    className={`form-control ${isValidEmail ? '' : 'is-invalid'}`}
                    type='text'
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                />
                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                    E-mail inválido, tente novamente!.
                </div>
            </div>
            {!isLoading ? (
                <button
                    className='btn btn-primary mt-2'
                    type='button'
                    onClick={() => login(email)}
                >
                    ENTRAR
                </button>
            ) : (
                <div className='loading-spinner'>
                    <img alt="loading" src={spinner} width={50} height={50}/>
                </div>
            )}
        </div>
    </>
    );
}

export default Login;