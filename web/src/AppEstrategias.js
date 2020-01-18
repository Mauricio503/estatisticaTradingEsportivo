import React, {useState} from 'react';
import api from './services/api';
import EstrategiasItem from './components/EstrategiasItem';

function App() {

    const [odds140a2, setOdds] = useState([]);
    async function buscaOdds140a2(){
        const response = await api.get('/estrategia/odd120a150');
       
        setOdds([...odds140a2,response.data]);
    }

    return (
    <div id="app">
        <aside>
            <h2>Estratégias</h2>
            <button onClick={buscaOdds140a2}>Buscar</button>
        </aside>
        <main>
            <ul>
                {odds140a2.map(dev => (
                    <EstrategiasItem key={dev.id} dev={dev} />
                ))}
            </ul>
        </main>
    </div>
  );
}

export default App;