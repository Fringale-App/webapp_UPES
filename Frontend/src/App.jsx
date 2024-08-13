// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Search from './components/Search';

function App() {
  return (
    <div>
      <Header/>
      <div className='p-4'>
        <Search/>
      </div>
      
    </div>
  );
}

export default App;
