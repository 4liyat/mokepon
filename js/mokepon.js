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
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let opcionDeMokepones
let opcionDeAtaques
let mokepones = []
let mokeponesEnemigos = []
let botones = []
let ataqueJugador = []
let ataqueEnemigo = []
let ataquesDeJugador = []
let ataquesDeEnemigo = []
let ataqueRandom
let indexAtaqueJugador
let indexAtaqueEnemigo
let mascotaJugador
let mascotaJugadorObjeto
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo

let alturaDeseada
let anchoMapa = window.innerWidth - 50
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"

const anchoMaximo = 350

if (anchoMapa > anchoMaximo) {
    anchoMapa = anchoMaximo
}

alturaDeseada = anchoMapa * (600/800)
mapa.width = anchoMapa
mapa.height = alturaDeseada

/* Aqui se modifica todo para agregar los mokepones */
let inputHipodoge
let inputCapipepo
let inputRatigueya

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 30
        this.alto = 30
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        this.id = id
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_Hipodoge_attack.png", 5, "./assets/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_Capipepo_attack.png", 5, "./assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_Ratigueya_attack.png", 5, "./assets/ratigueya.png")

const HIPODOGE_ATAQUES = [
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Tierra🌱", id: "boton-tierra"},
    {nombre: "Fuego🔥", id: "boton-fuego"}
]
const CAPIPEPO_ATAQUES = [
    {nombre: "Tierra🌱", id: "boton-tierra"},
    {nombre: "Tierra🌱", id: "boton-tierra"},
    {nombre: "Tierra🌱", id: "boton-tierra"},
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Fuego🔥", id: "boton-fuego"}
]
const RATIGUEYA_ATAQUES = [
    {nombre: "Fuego🔥", id: "boton-fuego"},
    {nombre: "Fuego🔥", id: "boton-fuego"},
    {nombre: "Fuego🔥", id: "boton-fuego"},
    {nombre: "Agua🌊", id: "boton-agua"},
    {nombre: "Tierra🌱", id: "boton-tierra"}
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya)
/* Aqui termina la seccion para agregar mokepones. */
function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

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

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
    .then(function (res) {
        if (res.ok) {
            res.text()
                .then(function (respuesta) {
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })
}

function seleccionarMascotaJugador() {
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

    if (mascotaJugador) {
    sectionVerMapa.style.display = "flex"
    sectionSeleccionarMascota.style.display = "none"
    
    iniciarMapa()
    extraerAtaques(mascotaJugador)
    pintarCanvas()
    seleccionarMokepon(mascotaJugador)
    }
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesDeEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function extraerAtaques(mascotaJugador) {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataquesDeJugador = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataquesDeJugador)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        opcionDeAtaques = `
        <button class="boton-ataque" id="${ataque.id}" name="${ataque.nombre}">${ataque.nombre}</button>`
    
        contenedorAtaques.innerHTML += opcionDeAtaques
    })

    botones = document.querySelectorAll(".boton-ataque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            ataqueJugador.push(boton.name)
            boton.style.background = "#112f58"
            boton.disabled = true

            iniciarPelea()
        })
    })
}

function iniciarPelea() {
    if (ataqueJugador.length === 5){
        enviarAtaques()
    }
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obetenerAtaques, 50)
}

function obetenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({ataques}) {
                if (ataques.length === 5) {
                    ataqueEnemigo = ataques
                    combate()
                }
            })
        }
    })
}

function indexAmbosOponentes(index) {
    indexAtaqueJugador = ataqueJugador[index]
    indexAtaqueEnemigo = ataqueEnemigo[index]
}

function combate() {
    clearInterval(intervalo)
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueEnemigo[index] == ataqueJugador[index]){
            indexAmbosOponentes(index)
            crearMensaje("!Empate! 🟰")
        } else if (ataqueJugador[index] == "Fuego🔥" && ataqueEnemigo[index] == "Tierra🌱"){
            indexAmbosOponentes(index)
            crearMensaje("!Ganaste! 🎉")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] == "Agua🌊" && ataqueEnemigo[index] == "Fuego🔥"){
            indexAmbosOponentes(index)
            crearMensaje("!Ganaste! 🎉")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] == "Tierra🌱" && ataqueEnemigo[index] == "Agua🌊"){
            indexAmbosOponentes(index)
            crearMensaje("!Ganaste! 🎉")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index)
            crearMensaje("Perdiste! 🦜")
            victoriasEnemigo++
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo
        }
    
        revisarVictorias()
    }    
}

function revisarVictorias() {
    if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("🎉 Felicidades, Has ganado el duelo! 🎉")
    } else if (victoriasJugador < victoriasEnemigo){
        crearMensajeFinal("😢 Perdiste, Sigue participando! 🦜")
    } else {
        crearMensajeFinal("😯 Quedaron empatados! Que tension!")
    }
}

function crearMensaje(resultado) {   
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionReiniciar.style.display = "block"
    sectionMensajes.innerHTML = resultadoFinal
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

function iniciarMapa() {

    mascotaJugadorObjeto = objetoMascota(mascotaJugador)
    window.addEventListener("keydown", teclaPresionada)
    window.addEventListener("keyup", detenerMovimiento)
    intervalo = setInterval(pintarCanvas, 50)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x += mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y += mascotaJugadorObjeto.velocidadY

    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x,y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    //se recogen cuales son los mokepones de los demas jugadores
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({enemigos}) {
                console.log(enemigos)
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre || ""

                    if (mokeponNombre === "Hipodoge") {
                        mokeponEnemigo = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_Hipodoge_attack.png", 5, "./assets/hipodoge.png", enemigo.id)
                    } else if (mokeponNombre === "Capipepo") {
                        mokeponEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_Capipepo_attack.png", 5, "./assets/capipepo.png", enemigo.id)
                    } else if (mokeponNombre === "Ratigueya") {
                        mokeponEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_Ratigueya_attack.png", 5, "./assets/ratigueya.png", enemigo.id)
                    }
                    
                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y
                    return mokeponEnemigo
                })
            })
        }
    })
}

function moverIzq() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverDer() {
    mascotaJugadorObjeto.velocidadX = +5
}
function moverUp() {
    mascotaJugadorObjeto.velocidadY = -5
}
function moverDown() {
    mascotaJugadorObjeto.velocidadY = +5
}
function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function teclaPresionada(event) {
    switch (event.key) {
        case "ArrowLeft":
            moverIzq()
            break
        case "ArrowRight":
            moverDer()
            break
        case "ArrowUp":
            moverUp()
            break
        case "ArrowDown":
            moverDown()
            break
        default:
            break
    }
}

function objetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const izquierdaMascota = mascotaJugadorObjeto.x
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    alert("Empieza el combate con " + enemigo.nombre)
    clearInterval(intervalo)
    seleccionarMascotaEnemigo(enemigo)
    detenerMovimiento()
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
}

window.addEventListener("load", iniciarJuego)