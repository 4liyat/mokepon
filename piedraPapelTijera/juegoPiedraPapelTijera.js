function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function eleccion(jugada){
    let resultado = "";
    if(jugada == 1){
        resultado = "Piedra 🥌";
    }
    else if(jugada == 2){
        resultado = "Papel 📜";
    }
    else if(jugada == 3){
        resultado = "Tijera ✂";
    }
    else{
        resultado = "Null";
    }
    return resultado;
}

//1 piedra, 2 papel, 3 tijera;
let jugador = 0;
let pc = 0;
let triunfos = 0;
let perdidas = 0;
let cantidadJuegos = 3;

//while para seguir jugando
while(triunfos < cantidadJuegos && perdidas < cantidadJuegos){
    pc = aleatorio(1,3);
    jugador = prompt("Para jugar escoge: 1 piedra 🥌, 2 papel 📜, 3 tijera ✂:")
    
    alert("jugador elije : "+ eleccion(jugador));
    alert("pc elije : "+ eleccion(pc));

    //combate
    if(pc == jugador){
        alert("Empate");
    }
    else if(jugador == 1 && pc == 3){
        alert("Ganaste");
        triunfos++;
    }
    else if(jugador == 2 && pc == 1){
        alert("Ganaste");
        triunfos++;
    }
    else if(jugador == 3 && pc == 2){
        alert("Ganaste");
        triunfos++;
    }
    else{
        alert("Perdiste");
        perdidas++;
    }
}
alert("Ganaste: " + triunfos + " veces. Perdiste: " + perdidas + " veces");