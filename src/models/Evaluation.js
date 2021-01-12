class Evaluation {
    constructor(id, dataParada, beberAgua, comerAlimentos, lerCartao, exercicioRelaxamento, evitarRecaida1, evitarRecaida2, evitarRecaida3) {
        this.id = id;
        this.dataParada = dataParada;
        this.beberAgua = beberAgua; // técnica para fissura (true or false)
        this.comerAlimentos = comerAlimentos; // técnica para fissura (true or false)
        this.lerCartao = lerCartao; // técnica para fissura (true or false)
        this.exercicioRelaxamento = exercicioRelaxamento; // técnica para fissura (true or false)
        this.evitarRecaida1 = evitarRecaida1;
        this.evitarRecaida2 = evitarRecaida2;
        this.evitarRecaida3 = evitarRecaida3;
        // this.estrategiasParaResistir = estrategiasParaResistir;
    }
}

export default Evaluation;