import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Graphic from '../components/Graphic';
import { getLocalStore } from '../services/localStore';
import { getData } from '../services/fetchApi';

import { spinner } from '../img';

const DATA = {
  headcount: {},
  turnover: {}
}

const USER = {
  nome: '',
  email: '',
  ano: '2021'
}

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(DATA);
  const [user, setUser] = useState(USER)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const userEmail = getLocalStore('email');
    const userNome = getLocalStore('nome');

    if (!userEmail) return navigate('/')

    setUser({ ...user, email: userEmail, nome: userNome });

    handleData(userEmail, user.ano)
  }, [user.ano])

  const handleData = async(email, ano) => {
    setIsLoading(true)

    const { result } = await getData(email, ano)

    setData(result)
    // setIsLoading(false)
  }
 
  return(
    <div>
      <Header nome={user.nome} />

      <div className='d-flex'>
        <aside className='leftBar'>
          <button
            className='btn btn-primary mt-5 btn-lg'
            type='button'
            onClick={() => setUser({ ...user, ano: '2020'})}
          >
            2020
          </button>
          <button
            className='btn btn-primary mt-2 btn-lg'
            type='button'
            onClick={() => setUser({ ...user, ano: '2021'})}
          >
            2021
          </button>
          <button
            className='btn btn-primary mt-2 btn-lg'
            type='button'
            onClick={() => setUser({ ...user, ano: '2022'})}
          >
            2022
          </button>
        </aside>
  
        {isLoading
        ? (
          <div className='loading'>
            <img alt="loading" src={spinner} width={200} height={200}/>
          </div>
        ) : (
          <main className='d-flex flex-column'>
            {Object.keys(data.headcount).length > 0 && <Graphic data={[data.headcount]} legendLeft={'Headcount'} legendBottom={'mês'}/>}
            {Object.keys(data.turnover).length > 0 && <Graphic data={[data.turnover]} legendLeft={'Turnover'} legendBottom={'mês'}/>}
          </main>
        )}
      </div>

    </div>
  )
}

export default Home;
