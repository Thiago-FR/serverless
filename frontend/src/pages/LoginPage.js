import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Login from '../components/Login'
import { getLocalStore } from '../services/localStore';
import { spinner } from '../img';

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const isLogin = getLocalStore('email');
        
        return isLogin ? navigate('/home') : setIsLoading(false);
    }, [])

    return(
    <>
        {!isLoading
        ? <Login email={email} setEmail={setEmail}/>
        : (
            <div className='login'>
                <div className='loading-spinner'>
                    <img alt="loading" src={spinner} width={200} height={200}/>
                </div>
            </div>
        )
        }        
    </>
    );
}

export default LoginPage;