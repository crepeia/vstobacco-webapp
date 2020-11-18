class Evaluation {
    constructor(id, dataParada, beberAgua, comerAlimentos, lerCartao, exercicioRelaxamento, evitarRecaida, estrategiasParaResistir) {
        this.id = id;
        this.dataParada = dataParada;
        this.beberAgua = beberAgua; // técnica para fissura (true or false)
        this.comerAlimentos = comerAlimentos; // técnica para fissura (true or false)
        this.lerCartao = lerCartao; // técnica para fissura (true or false)
        this.exercicioRelaxamento = exercicioRelaxamento; // técnica para fissura (true or false)
        this.evitarRecaida = evitarRecaida; //tentativas que funcionaram anteriormente para impedir recaídas
        this.estrategiasParaResistir = estrategiasParaResistir;
    }
}

export default Evaluation;