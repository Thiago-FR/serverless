import React, { useState } from 'react';
import Header from '../components/Header';
import Graphic from '../components/Graphic';

const { result: { headcount, turnover } } = await fetch('http://localhost:3001/role', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "email": "daniellewinters@kpis.tech",
    "ano": "2021"
  })
}).then(response => response.json()).then((data) => data);

function Home() {
 
  return(
    <div>
      <Header clear/>

      <main>
        {Object.keys(headcount).length > 0 && <Graphic data={[headcount]} legendLeft={'Headcount'} legendBottom={'mês'}/>}
        {Object.keys(turnover).length > 0 && <Graphic data={[turnover]} legendLeft={'Turnover'} legendBottom={'mês'}/>}
      </main>

    </div>
  )
}

export default Home;
