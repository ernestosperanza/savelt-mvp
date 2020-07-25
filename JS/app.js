window.addEventListener("load", main);
let sistema = new Sistema([]);


function main() {
    checkSession();
    document.getElementById("modal-next").addEventListener("click", nextModal);
    document.getElementById("nuevo-objetivo-btn").addEventListener("click", crearObjetivo);
    document.getElementById("objetivos").addEventListener("click", mostrarObjetivo);
    document.getElementById("crear-objetivos").addEventListener("click", objetivos);
    $(".btn-warning").click(function () {
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
        modal.find('.modal-title').text(objetivo)
        modal.find('.modal-body input').val(objetivo)
    });
    sistema.agregarObjetivoSistema(new Objetivo("Personalizado","2020-08-17", 1000, 800, 1));
    sistema.agregarObjetivoSistema(new Objetivo("Fondo de emergencia","2022-06-01", 50000, 100, 2));
    sistema.agregarObjetivoSistema(new Objetivo("Viaje soñado","2020-12-17", 10780, 5000, 3));
}

function mostrarObjetivo() {
    $("#carousel-objetivos").addClass('hide');
    $("#objetivos").addClass('hide')

    // Armar el historial
    $("#historial-objetivos").removeClass('hide');
    $("#crear-objetivos").removeClass('hide');

    let padre = document.getElementById("historial-objetivos");
    padre.innerHTML = "";
    
    for (let objetivo of sistema.objetivos) {

        let fecha = formatearFecha(objetivo.deadLine);
        let porcentaje = 0;
        if(objetivo.capitalActual > 0) {
            porcentaje = Math.floor((objetivo.capitalActual/objetivo.objetivo)*100);
        }

        let newDiv = document.createElement("div");
        newDiv.innerHTML = `<div class="col-sm-12 col-lg-4">
                                <div class="card card-objetivos">
                                    <div class="card-body">
                                        <img src="Img/objetivo-roma.jpg" class="card-img-top img-objetivos">
                                        <div class="separadores">
                                            <p class="objetivo-deadline text-muted" style="font-size: smaller">Finaliza ${fecha}</p>
                                            <p class="card-title">${objetivo.nombre}</p>
                                        </div>
                                        <div class="separadores">
                                            <div class="progress">
                                                <div class="progress-bar bg-info" role="progressbar" style="width: ${porcentaje}%" aria-valuenow="${porcentaje}" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                                <div>
                                                    <p style="float: left;">$${objetivo.capitalActual}</p>
                                                    <p style="float: right;">$${objetivo.objetivo}</p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        objetivo.nombre;
        padre.appendChild(newDiv);
    }
}

function objetivos() {
    $("#carousel-objetivos").removeClass('hide');
    $("#objetivos").removeClass('hide')

    $("#historial-objetivos").addClass('hide');
    $("#crear-objetivos").addClass('hide');
}

function calcularPorMes() {
    let valor = $("#valor-objetivo").val();
    if (valor > 0) {
        let tiempo = $("#fecha-objetivo").val();
        let capitalInicial = $("#capitalInicial-objetivo").val();
        let meses = calcularDiferenciaEnMeses(tiempo);
        meses = (meses === 0) ? 1 : meses;
        $("#sumaPorMes").text(Math.round((valor - capitalInicial) / meses));
        $('#alertPorMes').removeClass('hide');
    }
}

function calcularDiferenciaEnMeses(tiempo) {
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

    for (let i = 0; i < ventanas.length; i++) {

        if (ventanas[i].style.display === "block" && entro === false) {
            entro = true;

            if ((i + 1) < 4) {
                document.getElementById(`modal-win-${i}`).style.display = "none";
                document.getElementById(`modal-win-${i + 1}`).style.display = "block";
                document.getElementById(`bullets-${i}`).classList.remove("is-active");
                document.getElementById(`bullets-${i + 1}`).classList.add("is-active");

            } else if ((i + 1) === 4) {
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

    if (nombreObjetivo.reportValidity() && fechaObjetivo.reportValidity() &&
        valorObjetivo.reportValidity() && capitalInicial.reportValidity() && fechaObjetivo.value > today) {

        let objetivo = new Objetivo(nombreObjetivo.value,
                                    fechaObjetivo.value,
                                    valorObjetivo.value,
                                    capitalInicial.value,
                                    (sistema.objetivos.length + 1));
                                    
        sistema.agregarObjetivoSistema(objetivo);
        $('#alert1').removeClass('hide');
        setTimeout(function () {
            $('#formModal').modal('hide');
            $('.modal-backdrop').hide();
        }, 1500);
    } else if (fechaObjetivo.reportValidity() && fechaObjetivo.value <= today) {
        $('#error1').text('La fecha debe ser mayor al dia de hoy');
        $('#error1').removeClass('hide');
        setTimeout(function () {
            $('#error1').addClass('hide');
        }, 2000);
    }
}

function formatearFecha(date) {
    let fecha = new Date(date);
    mes = fecha.getMonth();

    day = fecha.getDate();
    year = fecha.getFullYear();

    let meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];

    if (day.length < 2) {
        day = '0' + day }
        
    return `${day} ${meses[mes]} ${year}`;
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

function checkSession() {
    var c = getCookie("visited");
    if (c !== "yes") {
        $(window).on('load', function () {
            $('#exampleModalCenter').modal('show');
        });
    }
    setCookie("visited", "yes", 365); // expire in 1 year; or use null to never expire
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) { c_start = c_value.indexOf(c_name + "="); }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        } c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}
