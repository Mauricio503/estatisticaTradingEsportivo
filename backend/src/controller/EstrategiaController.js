const axios = require('axios');

module.exports = {
    async teste(request,response){
        const t = {
            message: "certo"
        }
        return response.json(t);
    },
    async layPrimeiroTempo(request,response){
        const {urlRadarSofaScore} = request.body;
        console.log(urlRadarSofaScore);


        const get = axios.get("https://www.sofascore.com/event/8382498/json").catch(err => {
            //throw new Error(err);
            console.log("erro", err);
        });
        console.log(get);
        
        return response.json(get.data);
    },
    async pesquisa(request, response){
        const apiResponse = await axios.get("https://api.totalcorner.com/v1/match/today?token=9f0c3e829ed2bfd5&type=inplay&columns=odds,shotOff,possession");
        const {data} = apiResponse.data;
        const filtro = [];
        const {placarHome, placarAway,timeOdd, oddInicial, oddFinal, 
            tempoJogoInicial, tempoJogoFinal, rematesInicial, rematesFinal,
            timeRemates, rematesInicial2, rematesFinal2,
            timeRemates2, posseBolaInicialHome,
            posseBolaFinalHome} = request.query;
        data.forEach(element =>{
             var passouPeloFiltro = true;
            // filtra placar
            if(Number.parseFloat(element.hg) != Number.parseFloat(placarHome) 
                || Number.parseFloat(element.ag) != Number.parseFloat(placarAway)){
                    passouPeloFiltro = false;
            }
            // filtro odd
            if(timeOdd == 'home'){
                var indice = 0;
                element.i_odds.map(e => {
                    if(indice == 0){
                        if(Number.parseFloat(e) < Number.parseFloat(oddInicial)
                        || Number.parseFloat(e) > Number.parseFloat(oddFinal)){
                            passouPeloFiltro = false;
                        }
                    }
                    indice = indice + 1;
                });
            }else{
                var indice = 0;
                    element.i_odds.map(e => {
                        if(indice == 2 && Number.parseFloat(e) < Number.parseFloat(oddInicial)
                            && Number.parseFloat(e) > Number.parseFloat(oddFinal)){
                            passouPeloFiltro = false;
                        }
                    indice = indice + 1;
                    });
            }
            // filtro tempo
            if(Number.parseFloat(element.status.replace("Half","-1")) <  Number.parseFloat(tempoJogoInicial)
                || Number.parseFloat(element.status.replace("Half","-1")) >  Number.parseFloat(tempoJogoFinal)){
                    passouPeloFiltro = false;
            }
            //filtro remates
            var indR = 0;
            element.shot_off.map(e =>{
                if(indR == 0){
                    if(timeRemates == "home"){
                        if(Number.parseFloat(e) < Number.parseFloat(rematesInicial)
                         || Number.parseFloat(e) > Number.parseFloat(rematesFinal)){
                            passouPeloFiltro = false;
                        }
                    }
                    if(timeRemates2 == "home"){
                        if(Number.parseFloat(e) < Number.parseFloat(rematesInicial2)
                         || Number.parseFloat(e) > Number.parseFloat(rematesFinal2)){
                            passouPeloFiltro = false;
                        }
                    }
                }else{
                    if(timeRemates == "away"){
                        if(Number.parseFloat(e) < Number.parseFloat(rematesInicial)
                         || Number.parseFloat(e) > Number.parseFloat(rematesFinal)){
                            passouPeloFiltro = false;
                        }
                    }
                    if(timeRemates2 == "away"){
                        if(Number.parseFloat(e) < Number.parseFloat(rematesInicial2)
                         || Number.parseFloat(e) > Number.parseFloat(rematesFinal2)){
                            passouPeloFiltro = false;
                        }
                    }
                }
                indR = indR + 1;
            });
            //filtro posse de bola
            var indP = 0
            element.possess.map(e => {
                if(indP == 0){
                    if(Number.parseFloat(e) < Number.parseFloat(posseBolaInicialHome)
                     || Number.parseFloat(e) > Number.parseFloat(posseBolaFinalHome)){
                        passouPeloFiltro = false;
                    }
                }
                indP = indP + 1;
            });
            if(passouPeloFiltro == true){
                filtro.push(element);
            }
        });
        
        return response.json(filtro);
    },
};