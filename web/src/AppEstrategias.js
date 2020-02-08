import React, {useState} from 'react';
import api from './services/api';
import EstrategiaItem from './components/EstrategiasItem';
import EstrategiaForm from './components/EstrategiasForm';
import './AppEstrategias.css';

function App() {

    const [listaConsulta, setListaConsulta] = useState([]);

    /*
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
    */
    async function handleAddEst(data){
       const response = await api.post('/estrategia/pesquisa', data);
       setListaConsulta(response.data);
    }

     function dados() {
        var info = document.getElementById('jsGraphCanvas');
        console.log(info);
    }

    return (
    <div id="app">
        <aside>
            <h2>Estratégias</h2>
                <button onClick={dados}> executa função</button>
                <EstrategiaForm onSubmit={handleAddEst}/>
        </aside>
        <main>
            <div className="table-reponsive">
				<table className="table table-bordered table-hover">
					<thead>
						<tr className="well">
							<th>Times</th>
                            <th>Placar</th>
                            <th>Tempo</th>
                            <th>Remates</th>
                            <th>Posse de bola</th>
                            <th>Odds</th>
						</tr>						
					</thead>
					<tbody>
                        {listaConsulta.map(e => (
                            <EstrategiaItem key={e.id} e={e} />
                        ))}							
					</tbody>
				</table>
			</div>
        </main>
    </div>
  );
}

export default App;