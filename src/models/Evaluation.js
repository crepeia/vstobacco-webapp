class Evaluation {
    constructor(id, dataParada, tecnicasFissura, evitarRecaida, estrategiasParaResistir) {
        this.id = id;
        this.dataParada = dataParada;
        this.tecnicasFissura = tecnicasFissura;
        this.evitarRecaida = evitarRecaida; //tentativas que funcionaram anteriormente para impedir recaídas
        this.estrategiasParaResistir = estrategiasParaResistir;
    }
}

export default Evaluation;