const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const spanVictoriasJugador = document.getElementById("victorias-jugador")
const spanVictoriasEnemigo = document.getElementById("victorias-enemigo")
const sectionMensajes = document.getElementById("resultado")
const ataquesJugador = document.getElementById("ataques-jugador")
const ataquesEnemigo = document.getElementById("ataques-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("botones-ataque")

let opcionDeMokepones
let opcionDeAtaques
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mokepones = []
let botones = []
let ataqueJugador = []
let ataqueEnemigo = []
let ataquesDeJugador = []
let ataquesDeEnemigo = []
let ataqueRandom
let indexAtaqueJugador
let indexAtaqueEnemigo
let mascotaJugador
let victoriasJugador = 0
let victoriasEnemigo = 0

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5)
let furulillo = new Mokepon("Furulillo", "./assets/mokepons_mokepon_furulillo_attack.png", 5)

hipodoge.ataques.push(
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Tierra🌱", id: "boton-tierra"},
    {nombre: "Fuego🔥", id: "boton-fuego"},
)
capipepo.ataques.push(
    {nombre: "Tierra🌱", id: "boton-tierra"},
    {nombre: "Tierra🌱", id: "boton-tierra"},
    {nombre: "Tierra🌱", id: "boton-tierra"},
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Fuego🔥", id: "boton-fuego"},
)
ratigueya.ataques.push(
    {nombre: "Fuego🔥", id: "boton-fuego"},
    {nombre: "Fuego🔥", id: "boton-fuego"},
    {nombre: "Fuego🔥", id: "boton-fuego"},
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Tierra🌱", id: "boton-tierra"},
)
furulillo.ataques.push(
    {nombre: "Fuego🔥", id: "boton-fuego"},
    {nombre: "Fuego🔥", id: "boton-fuego"},
    {nombre: "Fuego🔥", id: "boton-fuego"},
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Tierra🌱", id: "boton-tierra"},
)

mokepones.push(hipodoge, capipepo, ratigueya, furulillo)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" id=${mokepon.nombre} name="mascota"/>
            <label class="tarjetas-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>`

        contenedorTarjetas.innerHTML += opcionDeMokepones
    })

    inputHipodoge = document.getElementById("Hipodoge")
    inputCapipepo = document.getElementById("Capipepo")
    inputRatigueya = document.getElementById("Ratigueya")

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarMascotaJugador(){
    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("Selecciona una mascota!")
    }

    if(mascotaJugador){
    sectionSeleccionarAtaque.style.display = "flex"
    sectionSeleccionarMascota.style.display = "none"
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
    }
}

function seleccionarMascotaEnemigo(){
    let mokeponAleatorio = aleatorio(0,mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mokeponAleatorio].nombre
    ataquesDeEnemigo = mokepones[mokeponAleatorio].ataques
    secuenciaAtaque()
}

function extraerAtaques(mascotaJugador){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataquesDeJugador = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataquesDeJugador)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        opcionDeAtaques = `
        <button class="boton-ataque" id="${ataque.id}" name="${ataque.nombre}">${ataque.nombre}</button>`
    
        contenedorAtaques.innerHTML += opcionDeAtaques
    })

    botones = document.querySelectorAll(".boton-ataque")
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            ataqueJugador.push(boton.name)
            boton.style.background = "#112f58"
            boton.disabled = true

            iniciarPelea()
        })
    })
}

function iniciarPelea(){
    if (ataqueJugador.length === 5){
        ataqueAleatorioEnemigo()
        combate()
    }
}

function ataqueAleatorioEnemigo(){
    ataqueRandom = shuffle(ataquesDeEnemigo)
    ataqueRandom.forEach(ataque => {
        ataqueEnemigo.push(ataque.nombre)        
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueEnemigo[index] == ataqueJugador[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("!Empate! 🟰")
        } else if (ataqueJugador[index] == "Fuego🔥" && ataqueEnemigo[index] == "Tierra🌱"){
            indexAmbosOponentes(index, index)
            crearMensaje("!Ganaste! 🎉")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] == "Agua🌊" && ataqueEnemigo[index] == "Fuego🔥"){
            indexAmbosOponentes(index, index)
            crearMensaje("!Ganaste! 🎉")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] == "Tierra🌱" && ataqueEnemigo[index] == "Agua🌊"){
            indexAmbosOponentes(index, index)
            crearMensaje("!Ganaste! 🎉")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("Perdiste! 🦜")
            victoriasEnemigo++
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo
        }
    
        revisarVictorias()
    }    
}

function revisarVictorias(){
    if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("🎉 Felicidades, Has ganado el duelo! 🎉")
    } else if (victoriasJugador < victoriasEnemigo){
        crearMensajeFinal("😢 Perdiste, Sigue participando! 🦜")
    } else {
        crearMensajeFinal("😯 Quedaron empatados! Que tension!")
    }
}

function crearMensaje(resultado){   
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionReiniciar.style.display = "block"
    sectionMensajes.innerHTML = resultadoFinal
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener("load", iniciarJuego)