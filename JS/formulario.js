'use-strict'

$(function () {

    var boton = document.querySelector("#login");


    $.getJSON('../usuarios.json', function (data) {
        // Almacenar datos en el LocalStorage
        localStorage.setItem('usuarios', JSON.stringify(data));
    });


    boton.addEventListener('click', function () {
        var usuario = document.getElementById("usuario").value;
        var contraseña = document.getElementById("contraseña").value;

        var validar = comprobarUsuario(usuario, contraseña)

        if (validar) {
            //alert('¡Acceso permitido!');
            console.log("funciona") // Reemplaza esto con la acción que deseas realizar después de la autenticación
            window.open("index.html");
            //window.location.href("index.html");
        } else {
            //$(boton).css("background", "red")
            alert('Usuario o contraseña incorrectos');

        }
    })

    // Función para comprobar si el usuario y la contraseña están en la lista
    function comprobarUsuario(usuario, contraseña) {
        // Obtener datos del LocalStorage
        var usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));

        // Verificar si el usuario y la contraseña coinciden con los almacenados
        for (var i = 0; i < usuariosGuardados.length; i++) {
            var usuarioGuardado = usuariosGuardados[i];
            console.log(usuarioGuardado);
            console.log(usuario);
            console.log(contraseña);

            if (usuario === usuarioGuardado.usuario && contraseña === usuarioGuardado.contraseña) {
                return true; // Usuario autenticado con éxito
            }
        }

        return false; // Usuario no autenticado
    }

})