import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Graphic from '../components/Graphic';
import { getLocalStore } from '../services/localStore';
import { getData } from '../services/fetchApi';

import { spinner } from '../img';
import SideBar from '../components/SideBar';

const DATA = {
  headcount: {},
  turnover: {}
}

const USER = {
  nome: '',
  email: '',
  ano: '2020'
}

const GRAPHIC_DETAIL = {
  area: false,
  curve: true,
  pointColor: '#b32323',
  enableGridX: true,
  enableGridY: true,
  enablePoints: true,
  enablePointLabel: false
}

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(DATA);
  const [user, setUser] = useState(USER)
  const [isLoading, setIsLoading] = useState(true)
  const [editGraphic, setEditGrapgic] = useState(GRAPHIC_DETAIL)

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

  const handleGraphic = (value) => setEditGrapgic({ ...editGraphic, ...value })
 
  return(
    <div>
      <Header nome={user.nome} />
      
      <div className='d-flex'>
        <SideBar
          editGraphic={editGraphic}
          handleGraphic={handleGraphic}
          setUser={setUser}
          user={user}
        />

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
                enableArea={editGraphic.area}
                curve={editGraphic.curve ? 'natural' : 'linear'}
                pointColor={editGraphic.pointColor}
                enableGridX={editGraphic.enableGridX}
                enableGridY={editGraphic.enableGridY}
                enablePoints={editGraphic.enablePoints}
                enablePointLabel={editGraphic.enablePointLabel}
              />}
            {Object.keys(data.turnover).length > 0 &&
              <Graphic
                data={[data.turnover]}
                legendLeft={'Turnover'}
                legendBottom={'mês'}
                enableArea={editGraphic.area}
                curve={editGraphic.curve ? 'natural' : 'linear'}
                pointColor={editGraphic.pointColor}
                enableGridX={editGraphic.enableGridX}
                enableGridY={editGraphic.enableGridY}
                enablePoints={editGraphic.enablePoints}
                enablePointLabel={editGraphic.enablePointLabel}
              />}
          </main>
        )}
      </div>

    </div>
  )
}

export default Home;
