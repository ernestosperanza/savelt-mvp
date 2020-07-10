window.addEventListener("load", main);
let sistema = new Sistema([]);

function main() {
    document.getElementById("modal-next").addEventListener("click", nextModal);
    document.getElementById("nuevo-objetivo-btn").addEventListener("click", crearObjetivo);
    $(".btn-warning").click(function(){
        $('#alertPorMes').addClass('hide');
        $('#alert1').addClass('hide');
        $('#error1').addClass('hide')
    });
    $("#valor-objetivo").focusout(calcularPorMes);
    $("#capitalInicial-objetivo").focusout(calcularPorMes);
    $("#fecha-objetivo").focusout(calcularPorMes);
    $('#formModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        var objetivo = button.data('whatever')
        var modal = $(this)
        modal.find('.modal-title').text('Nuevo objetivo - ' + objetivo)
        modal.find('.modal-body input').val(objetivo)
    });
}

function calcularPorMes(){
    let valor = $("#valor-objetivo").val();
    if (valor > 0) {
        let tiempo = $("#fecha-objetivo").val();
        let capitalInicial = $("#capitalInicial-objetivo").val();
        let meses = calcularDiferenciaEnMeses(tiempo);
        meses = (meses === 0) ? 1 : meses;
        $( "#sumaPorMes" ).text(Math.round((valor-capitalInicial)/meses));
        $('#alertPorMes').removeClass('hide');
    }
}

function calcularDiferenciaEnMeses(tiempo){
    let months;
    const d1 = new Date();
    const d2 = new Date(tiempo);
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
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
    var today = new Date();
    today = formatDate(today);

    if(nombreObjetivo.reportValidity() && fechaObjetivo.reportValidity() &&
       valorObjetivo.reportValidity() && capitalInicial.reportValidity() && fechaObjetivo.value > today){
        
        let objetivo = new Objetivo(nombreObjetivo.value,
                                    fechaObjetivo.value, 
                                    valorObjetivo.value,
                                    capitalInicial.value,
                                    (sistema.objetivos.length+1));
        sistema.agregarObjetivoSistema(objetivo);
        $('#alert1').removeClass('hide');
        setTimeout(function(){ 
            $('#formModal').modal('hide');
            $('.modal-backdrop').hide();
        }, 1500);
    } else if (fechaObjetivo.reportValidity() && fechaObjetivo.value <= today){
        $('#error1').text('La fecha debe ser mayor al dia de hoy');
        $('#error1').removeClass('hide');
        setTimeout(function(){ 
            $('#error1').addClass('hide');
        }, 2000);
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


function setCookie(c_name,value,exdays){var exdate=new Date();exdate.setDate(exdate.getDate() + exdays);var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());document.cookie=c_name + "=" + c_value;}

function getCookie(c_name){var c_value = document.cookie;var c_start = c_value.indexOf(" " + c_name + "=");if (c_start == -1){c_start = c_value.indexOf(c_name + "=");}if (c_start == -1){c_value = null;}else{c_start = c_value.indexOf("=", c_start) + 1;var c_end = c_value.indexOf(";", c_start);if (c_end == -1){c_end = c_value.length;}c_value = unescape(c_value.substring(c_start,c_end));}return c_value;}

checkSession();

function checkSession(){
   var c = getCookie("visited");
   if (c === "yes") {
   } else {
       $(window).on('load', function () {
           $('#exampleModalCenter').modal('show');
    });
   }
   setCookie("visited", "yes", 365); // expire in 1 year; or use null to never expire
}