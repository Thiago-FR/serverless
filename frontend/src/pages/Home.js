import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Graphic from '../components/Graphic';
import { getLocalStore } from '../services/localStore';
import { getData } from '../services/fetchApi';

import { spinner } from '../img';
import { Toggle } from '../components/Toggle';

const DATA = {
  headcount: {},
  turnover: {}
}

const USER = {
  nome: '',
  email: '',
  ano: '2020'
}

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(DATA);
  const [user, setUser] = useState(USER)
  const [isLoading, setIsLoading] = useState(true)
  const [graphicsEnableArea, setGraphicsEnableArea] = useState(false)
  const [graphicsEnableCurve, setGraphicsEnableCurve] = useState(true)

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
    setIsLoading(false)
  }
 
  return(
    <div>
      <Header nome={user.nome} />

      <div className='d-flex'>
        <aside className='leftBar'>
          <div className='d-flex flex-column m-5'>
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
          </div>
          <div>
            <Toggle
              label="Área"
              toggled={graphicsEnableArea}
              onClick={setGraphicsEnableArea}
            />
            <Toggle
              label="Curva"
              toggled={graphicsEnableCurve}
              onClick={setGraphicsEnableCurve}
            />
          </div>
        </aside>
  
        {isLoading
        ? (
          <div className='loading'>
            <img alt="loading" src={spinner} width={200} height={200}/>
          </div>
        ) : (
          <main className='d-flex flex-column'>
            {Object.keys(data.headcount).length > 0
              && <Graphic
                data={[data.headcount]}
                legendLeft={'Headcount'}
                legendBottom={'mês'}
                enableArea={graphicsEnableArea}
                curve={graphicsEnableCurve ? 'natural' : 'linear'}
              />}
            {Object.keys(data.turnover).length > 0 &&
              <Graphic
                data={[data.turnover]}
                legendLeft={'Turnover'}
                legendBottom={'mês'}
                enableArea={graphicsEnableArea}
                curve={graphicsEnableCurve ? 'natural' : 'linear'}
              />}
          </main>
        )}
      </div>

    </div>
  )
}

export default Home;
