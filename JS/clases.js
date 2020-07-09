class Objetivo {
    constructor(nombre, deadLine, objetivo, capitalInicial, id) {
        this.nombre = nombre;
        this.deadLine = deadLine;
        this.objetivo = objetivo;
        this.capitalInicial = capitalInicial;
        this.id = id;
    }
}

class Sistema {
    constructor() {
        this.objetivos = [];
    }
    agregarObjetivoSistema(objetivo) {
        this.objetivos.push(objetivo);
    }
}