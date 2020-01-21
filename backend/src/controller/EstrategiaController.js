const axios = require('axios');


module.exports = {
    async odd120a150(request,response){
        const apiResponse = await axios.get("https://api.totalcorner.com/v1/match/today?token=9f0c3e829ed2bfd5&type=inplay&columns=events,odds");
        const {data} = apiResponse.data;
        const [start] = data;
        const t = []
        data.forEach(element =>{
            element.i_odds.forEach(element2 =>{
                if(Number.parseFloat(element2) >= 1.40 && Number.parseFloat(element2) <= 2){
                    t.push(element);
                }
            });
            
        });
        return response.json(t);
    },
    async pesquisa(request, response){
        const apiResponse = await axios.get("https://api.totalcorner.com/v1/match/today?token=9f0c3e829ed2bfd5&type=inplay&columns=odds,shotOff,possession");
        const {data} = apiResponse.data;
        const filtro = [];
        const {placarHome, placarAway,timeOdd, oddInicial, oddFinal, 
            tempoJogoInicial, tempoJogoFinal, rematesInicialHome, rematesFinalHome,
            rematesInicialAway, rematesFinalAway, posseBolaInicialHome,
            posseBolaFinalHome} = request.body;
        data.forEach(element =>{
             var passouPeloFiltro = true;
            // filtra placar
            if(Number.parseFloat(element.hg) != placarHome 
                || Number.parseFloat(element.ag) != placarAway){
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
                    if(e < rematesInicialHome || e > rematesFinalHome){
                        passouPeloFiltro = false;
                    }
                }else{
                    if(e < rematesInicialAway || e > rematesFinalAway){
                        passouPeloFiltro = false;
                    }
                }
                indR = indR + 1;
            });
            //filtro posse de bola
            var indP = 0
            element.possess.map(e => {
                if(indP == 0){
                    if(e < posseBolaInicialHome || e > posseBolaFinalHome){
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