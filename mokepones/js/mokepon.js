let ataqueJugador;
let ataqueEnemigo;

function iniciarJuego(){
    let botonMascotaJugador = document.getElementById("boton-mascota");
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.addEventListener("click", ataqueFuego);
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.addEventListener("click", ataqueAgua);
    let botonTierra = document.getElementById("boton-tierra");
    botonTierra.addEventListener("click", ataqueTierra);


}

function seleccionarMascotaJugador(){
    let inputHipodoge = document.getElementById("hipodoge");
    let inputCapipepo = document.getElementById("capipepo");
    let inputRatigueya = document.getElementById("ratigueya");
    let spanMascotaJugador = document.getElementById("mascota-jugador");

    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = "Hipodoge";
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = "Capipepo";
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = "Ratigueya";
    } else {
        alert("Selecciona una mascota!");
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){
    let mokeponAleatorio = aleatorio(1,3);
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

    if (mokeponAleatorio == 1){
        spanMascotaEnemigo.innerHTML = "Hipodoge";
    } else if (mokeponAleatorio == 2){
        spanMascotaEnemigo.innerHTML = "Capipepo";
    } else {
        spanMascotaEnemigo.innerHTML = "Ratigueya";
    }
}

function ataqueFuego(){
    ataqueJugador = "Fuego🔥";
    ataqueAleatorioEnemigo();
    alert(ataqueJugador + ", " + ataqueEnemigo);
}
function ataqueAgua(){
    ataqueJugador = "Agua🌊";
    ataqueAleatorioEnemigo();
    alert(ataqueJugador + ", " + ataqueEnemigo);
}
function ataqueTierra(){
    ataqueJugador = "Tierra🌱";
    ataqueAleatorioEnemigo();
    alert(ataqueJugador + ", " + ataqueEnemigo);
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3);

    if (ataqueAleatorio == 1){
        ataqueEnemigo = "Fuego🔥";
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = "Agua🌊";
    } else {
        ataqueEnemigo = "Tierra🌱";
    }
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

window.addEventListener("load", iniciarJuego);