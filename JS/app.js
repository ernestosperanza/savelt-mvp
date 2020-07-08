class Objetivos {
    constructor(nombre, deadLine, objetivo, capitalInicial, tipo) {
        this.nombre = nombre;
        this.deadLine = deadLine;
        this.objetivo = objetivo;
        this.capitalInicial = capitalInicial;
        this.tipo = tipo;
    }
}

let objetivo1 = new Objetivos('viaje', '10/06/2020', 9000, 100, 1);

console.log(objetivo1);

