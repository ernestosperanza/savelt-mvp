window.addEventListener("load", main);

function main() {
    document.getElementById("modal-next").addEventListener("click", nextModal);
}

function nextModal() {
    let ventanas = document.getElementsByClassName("modal-window");

    let entro = false;

    for (let i = 0; i< ventanas.length; i++){

        if(ventanas[i].style.display === "block" && entro === false) {
            entro = true;

            if((i+1)<4) {            
                document.getElementById(`modal-win-${i}`).style.display = "none";
                document.getElementById(`modal-win-${i+1}`).style.display = "block";
                document.getElementById(`bullets-${i}`).classList.remove("is-active");
                document.getElementById(`bullets-${i+1}`).classList.add("is-active");
                 
            } else if ((i+1) === 4){
                $('#exampleModalCenter').modal('hide')
            }
        }
    }
}
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

