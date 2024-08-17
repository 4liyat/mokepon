const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonTierra = document.getElementById("boton-tierra");
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const inputHipodoge = document.getElementById("hipodoge");
const inputCapipepo = document.getElementById("capipepo");
const inputRatigueya = document.getElementById("ratigueya");
const spanMascotaJugador = document.getElementById("mascota-jugador");

const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesJugador = document.getElementById("ataques-jugador");
const ataquesEnemigo = document.getElementById("ataques-enemigo");

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5);
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5);
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5);

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none";
    sectionReiniciar.style.display = "none";

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    botonFuego.addEventListener("click", ataqueFuego);
    botonAgua.addEventListener("click", ataqueAgua);
    botonTierra.addEventListener("click", ataqueTierra);

    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador(){
    sectionSeleccionarAtaque.style.display = "flex";
    sectionSeleccionarMascota.style.display = "none";

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
}
function ataqueAgua(){
    ataqueJugador = "Agua🌊";
    ataqueAleatorioEnemigo();
}
function ataqueTierra(){
    ataqueJugador = "Tierra🌱";
    ataqueAleatorioEnemigo();
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

    combate();
}

function combate(){
    if (ataqueEnemigo == ataqueJugador){
        crearMensaje("!Empate! 🟰");
    } else if (ataqueJugador == "Fuego🔥" && ataqueEnemigo == "Tierra🌱"){
        crearMensaje("!Ganaste! 🎉");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == "Agua🌊" && ataqueEnemigo == "Fuego🔥"){
        crearMensaje("!Ganaste! 🎉");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == "Tierra🌱" && ataqueEnemigo == "Agua🌊"){
        crearMensaje("!Ganaste! 🎉");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("Perdiste! 🦜");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas();
}

function revisarVidas(){
    if (vidasEnemigo == 0){
        crearMensajeFinal("🎉 Felicidades, Has ganado el duelo! 🎉");
    } else if (vidasJugador == 0){
        crearMensajeFinal("😢 Perdiste, Sigue participando!");
    }
}

function crearMensaje(resultado){   
    let nuevoAtaqueJugador = document.createElement("p");
    let nuevoAtaqueEnemigo = document.createElement("p");

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;

    ataquesJugador.appendChild(nuevoAtaqueJugador);
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function crearMensajeFinal(resultadoFinal){
    sectionReiniciar.style.display = "block";
    sectionMensajes.innerHTML = resultadoFinal;

    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

window.addEventListener("load", iniciarJuego);