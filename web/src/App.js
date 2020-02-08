import React from 'react';
import './App.css';
// corrigir erro segurity erro
// node_modules/react-dev-utils/webpackHotDevClient.js:60
// protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',
function App() {
 function dados() {
        var info = document.getElementById('event-graph__container');
        console.log(info);
    }
  return (
    <div className="App">
      <header className="App-header">
        <img src="" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={dados}>dados</button>
        <iframe id="frame" src="https://www.sofascore.com/pt/evento/8296606/attack-momentum/inserir" width="100%" height="170" frameborder="0" scrolling="no"></iframe><div><a href="https://www.sofascore.com/pt/central-cordoba-aldosivi/LLosBnB" target="_blank">Aldosivi  -  Central Córdoba Resultados ao vivo</a></div>
      </header>
    </div>
  );
}

export default App;
