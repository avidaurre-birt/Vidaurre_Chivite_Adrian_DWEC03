'use-strict'

$(function () {
    var inicio = document.querySelector(".empezar");
    var seccion = document.querySelector(".tablero");
    var dificultad = "normal";
    var puntuacion = document.querySelector(".score");
    var setIntervalId;
    var snakeX = 5;
    var snakeY = 2;
    var snakeBody = []
    var comidaX, comidaY
    var velocidadX = 0;
    var velocidadY = 0;
    var gameOver = false;
    let score = 0;


    inicio.addEventListener('click', function () {
        guardarDificultad();
        crearComida();
        iniciarJuego();
        console.log(dificultad)

        if (dificultad == "dificil") {
            setIntervalId = setInterval(iniciarJuego, 90);
        }
        if (dificultad == "maestro") {
            setIntervalId = setInterval(iniciarJuego, 60);
        }
        else {
            setIntervalId = setInterval(iniciarJuego, 120);
        }
    });


    function guardarDificultad() {
        dificultad = document.querySelector(".dificultad").value;
    }
    function crearComida() {
        comidaX = Math.floor(Math.random() * 30) + 1;
        comidaY = Math.floor(Math.random() * 30) + 1;
        console.log("click")
    }

    function gameOverFun() {
        console.log(setIntervalId);
        clearInterval(setIntervalId);
        alert("Game Over");
        console.log(setIntervalId);
        location.reload();

    }

    function iniciarJuego() {

        if (gameOver) return gameOverFun();

        if (snakeX == comidaX && snakeY == comidaY) {
            crearComida();
            snakeBody.push([comidaX, comidaY]);
            score++;
            puntuacion.innerHTML = `Score: ${score}`;
        }

        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1];
        }

        snakeBody[0] = [snakeX, snakeY];
        snakeX += velocidadX;
        snakeY += velocidadY;

        seccion.innerHTML = '';

        if (snakeX <= 0 || snakeX > 32 || snakeY <= 0 || snakeY > 32) {
            gameOver = true;
        }

        for (let i = 0; i < snakeBody.length; i++) {
            var serpiente = document.createElement("div")
            serpiente.className = ("snake")
            serpiente.style = (`grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}`)
            seccion.appendChild(serpiente);

            if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
                gameOver = true;
            }
        }

        var comida = document.createElement("div")
        comida.className = ("comida")
        comida.style = (`grid-area: ${comidaX} / ${comidaY}`)
        seccion.appendChild(comida);

    }
    //crearComida();
    // iniciarJuego();

    // Escucha eventos de teclado para cambiar la dirección de la serpiente
    document.addEventListener('keydown', function (event) {
        cambiarDireccion(event);
    });


    // Función para cambiar la dirección de la serpiente
    function cambiarDireccion(event) {
        if (event.key === 'ArrowUp' && velocidadX != 1) {
            console.log(event.key)
            velocidadX = -1;
            velocidadY = 0;
        } else if (event.key === 'ArrowDown' && velocidadX != -1) {
            console.log(event.key)
            velocidadX = 1;
            velocidadY = 0;
        } else if (event.key === 'ArrowLeft' && velocidadY != 1) {
            velocidadX = 0;
            velocidadY = -1;
        } else if (event.key === 'ArrowRight' && velocidadY != -1) {
            velocidadX = 0;
            velocidadY = 1;
        }

        // iniciarJuego();
        // console.log(snakeX)
        // console.log(snakeY)
    }
    //});

    //setIntervalId = setInterval(iniciarJuego, 60);
});