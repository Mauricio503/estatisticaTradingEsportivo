import React,{useState} from 'react';


function EstrategiasForm({ onSubmit }){

    const [placarHome, setPlacarHome] = useState('');
    const [placarAway, setPlacarAway] = useState('');
    const [oddInicial, setOddInicial] = useState('');
    const [oddFinal, setOddFinal] = useState('');
    const [timeOdd, setTimeOdd] = useState('');
    const [tempoJogoInicial, setTempoJogoInicial] = useState('');
    const [tempoJogoFinal, setTempoJogoFinal] = useState('');
    const [rematesInicial, setRematesInicial] = useState('');
    const [rematesFinal, setRematesFinal] = useState('');
    const [timeRemates, setTimeRemates] = useState('');
    const [posseDeBolaInicial, setPosseDeBolaInicial] = useState('');
    const [posseDeBolaFinal, setPosseDeBolaFinal] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        var data = {
            placarHome: placarHome,
            placarAway: placarAway,
            oddInicial: oddInicial,
            oddFinal: oddFinal,
            timeOdd: timeOdd,
            tempoJogoInicial: tempoJogoInicial,
            tempoJogoFinal: tempoJogoFinal,
            rematesInicial: rematesInicial,
            rematesFinal: rematesFinal,
            timeRemates: timeRemates,
            posseDeBolaInicial: posseDeBolaInicial,
            posseDeBolaFinal: posseDeBolaFinal
        };
        await onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="col-sm-12 row">
                <div className="col-sm-4 row">
                    <div className="col-sm-4">
                        <label>Placar: </label>
                    </div>
                    <div className="col-sm-3">
                        <input className="form-control col-sm-7" name="placarHome"
                        required onChange={e => setPlacarHome(e.target.value)}
                        value={placarHome}></input>
                    </div>
                    <div className="col-sm-3">
                        <input className="form-control col-sm-7" name="placarAway"
                        required onChange={e => setPlacarAway(e.target.value)}
                        value={placarAway}></input>
                    </div>
                </div>
                <div className="col-sm-6 row">
                        <div className="col-sm-3">
                            <label>Odds: </label>
                        </div>
                        <div className="col-sm-6 row">
                            <div className="col-sm-6">
                                <input name="oddInicial" className="form-control"
                                required onChange={e => setOddInicial(e.target.value)}
                                value={oddInicial}></input>
                            </div>
                            <div className="col-sm-6">
                                <input name="oddFinal" className="form-control"
                                required onChange={e => setOddFinal(e.target.value)}
                                value={oddFinal}></input>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <select name="timeOdd" className="form-control"
                                required onChange={e => setTimeOdd(e.target.value)}
                                value={timeOdd}>
                                <option></option>
                                <option value="home">Casa</option>
                                <option value="away">Fora</option>
                            </select>
                        </div>
                </div>
            </div>
            <div className="col-sm-12 row" id="bloco2Input">
                <div className="col-sm-4 row">
                    <div className="col-sm-6">
                        <label>Tempo de Jogo: </label>
                    </div>
                    <div className="col-sm-3">
                        <input className="form-control" name="tempoJogoInicial"
                        required onChange={e => setTempoJogoInicial(e.target.value)}></input>
                    </div>
                    <div className="col-sm-3">
                        <input className="form-control" name="tempoJogoFinal"
                        required onChange={e => setTempoJogoFinal(e.target.value)}></input>
                    </div>
                </div>
                <div className="col-sm-6 row">
                    <div className="col-sm-3">
                        <label>Remates: </label>
                    </div>
                    <div className="col-sm-6 row">
                        <div className="col-sm-6">
                            <input name="rematesInicial" className="form-control"
                            required onChange={e => setRematesInicial(e.target.value)}></input>
                        </div>
                        <div className="col-sm-6">
                            <input name="rematesFinal" className="form-control"
                            required onChange={e => setRematesFinal(e.target.value)}></input>
                        </div>
                    </div>
                        <div className="col-sm-3">
                            <select name="timeRemates" className="form-control"
                            required onChange={e => setTimeRemates(e.target.value)}>
                                 <option></option>
                                <option value="home">Casa</option>
                                <option value="away">Fora</option>
                            </select>
                        </div>
                </div>
            </div>
            <div className="col-sm-12" id="bloco3Input">
                <div className="col-sm-6 row">
                    <div className="col-sm-3">
                        <label>Posse de bola time de Casa: </label>
                    </div>
                    <div className="col-sm-6 row">
                        <div className="col-sm-6">
                            <input name="posseDeBolaInicial" className="form-control"
                            required onChange={e => setPosseDeBolaInicial(e.target.value)}></input>
                        </div>
                        <div className="col-sm-6">
                            <input name="PosseDeBolaFinal" className="form-control"
                            required onChange={e => setPosseDeBolaFinal(e.target.value)}></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-2">
                <button className="form-control" type="submit">Buscar</button>
            </div>
            </form>
    );
}

export default EstrategiasForm;