import React from 'react';
import { useState } from 'react';
import './App.css';
import api from './api';
import { supplier_id } from './constants';

function App() {
  api.getSupplierCards(supplier_id).then((res) => {
    console.log(res);
    api.getCardsFoto(res).then((data) => {
      console.log(data);
    });
  });
  return (
    <div className='App'>
      <header className='App-header'>
        <p>hello</p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
