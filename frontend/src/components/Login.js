import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../services/fetchApi';
import { saveLocalStore } from '../services/localStore';
import { profile1, profile2, profile3, profile4, spinner } from '../img';
import data from './data/data.json';

const imgProfile = [profile1, profile2, profile3, profile4]


function Login({ email, setEmail }) {
    const navigate = useNavigate();
    
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [validadeError, setValidadeError] = useState(data.error.email.message)

    const login = async () => {
        setIsLoading(true);
        const result = await auth(email);
        
        if (result.status === 'ativo') {
            setValidadeError(data.error.email.message);
            saveLocalStore('email', email);
            saveLocalStore('nome', result.nome);
            return navigate('/home')
        };

        if (result.status === 'null') {
            setValidadeError(data.error.default.message);
        }

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
                <span className="input-group-text" id="basic-addon1">@</span>
                <input
                    className={`form-control ${isValidEmail ? '' : 'is-invalid'}`}
                    type='text'
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    data-testid='input-email'
                />
                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                    {validadeError}
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