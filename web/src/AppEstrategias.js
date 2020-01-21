import React, {useState} from 'react';
import api from './services/api';
import EstrategiaItem from './components/EstrategiasItem'

function App() {

    const [odds140a2, setOdds] = useState([]);

    setInterval(async function() { 
        const response = await api.get('/estrategia/odd120a150');
        
        setOdds(response.data);
        
         }, 10000);

        async function buscaOdds140a2(){
        const response = await api.get('/estrategia/odd120a150');
        
        setOdds(response.data);
        odds140a2.map(e => {
            console.log(e.id);
        });
    }
    


    return (
    <div id="app">
        <aside>
            <h2>Estratégias</h2>
            <button >Buscar</button>
        </aside>
        <main>
            <h3>Odds de 1.20 a 1.50</h3>
            <ul>
              {odds140a2.map(e => (
                    <EstrategiaItem key={e.id} e={e} />
                ))}
            </ul>
        </main>
    </div>
  );
}

export default App;