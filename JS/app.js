window.addEventListener("load", main);
let sistema = new Sistema([]);

function main() {
    document.getElementById("modal-next").addEventListener("click", nextModal);
    document.getElementById("nuevo-objetivo-btn").addEventListener("click", crearObjetivo);
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

function crearObjetivo() {
    let nombreObjetivo = document.getElementById("nombre-objetivo");
    let fechaObjetivo = document.getElementById("fecha-objetivo");
    let valorObjetivo = document.getElementById("valor-objetivo");
    let capitalInicial = document.getElementById("capitalInicial-objetivo");

    if(nombreObjetivo.reportValidity() && fechaObjetivo.reportValidity() &&
       valorObjetivo.reportValidity() && capitalInicial.reportValidity()){
        
        let objetivo = new Objetivo(nombreObjetivo.value,
                                    fechaObjetivo.value, 
                                    valorObjetivo.value,
                                    capitalInicial.value,
                                    (sistema.objetivos.length+1));
        sistema.agregarObjetivoSistema(objetivo);
        $('#formModal').modal('hide');
        $('.modal-backdrop').hide();
    }
}