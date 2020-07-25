class Objetivo {
    constructor(nombre, deadLine, objetivo, capitalActual, id) {
        this.nombre = nombre;
        this.deadLine = deadLine;
        this.objetivo = objetivo;
        this.capitalActual = capitalActual;
        this.id = id;
    }

    calcularRestante() {
        return this.objetivo - this.capitalActual;
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


/// Aux ///
