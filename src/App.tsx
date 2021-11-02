import React from 'react';
import './App.css';
import { GlobalStyle } from './styles/GlobalStyle';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GlobalStyle />
        <Layout />
      </header>
    </div>
  );
}

export default App;
