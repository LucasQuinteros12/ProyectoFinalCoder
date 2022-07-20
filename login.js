const containerLR = document.querySelector(".container-login-register");

const formularioLogin = document.querySelector(".formulario-login");
const formularioRegister = document.querySelector(".formulario-register");

const containerLogin = document.querySelector(".container-login");
const containerRegister = document.querySelector(".container-register");

const btnResgistro = document.getElementById("boton-registro");

window.addEventListener("resize", anchoPagina)

function register() {
  if (window.innerWidth > 850) {
    formularioRegister.style.display = "block";
    containerLR.style.left = "410px";
    formularioLogin.style.display = "none";
    containerRegister.style.opacity = "0";
    containerLogin.style.opacity = "1";
  } else {
    formularioRegister.style.display = "block";
    containerLR.style.left = "0px";
    formularioLogin.style.display = "none";
    containerRegister.style.display = "none";
    containerRegister.style.display = "block";
    containerLogin.style.opacity = "1";
  }
}

anchoPagina();
document.getElementById("btn-registrarse").addEventListener("click", register);

btnResgistro.addEventListener('click', ()=>{
  Toastify({
    text: "Registrado Correctamente",
    duration: 3000,
    gravity: 'bottom',
    style: {
        background: 'black'
    }
}).showToast();

})
function iniciarSesion() {
  if (window.innerWidth > 850) {
    formularioRegister.style.display = "none";
    containerLR.style.left = "10px";
    formularioLogin.style.display = "block";
    containerRegister.style.opacity = "1";
    containerLogin.style.opacity = "0";
  } else {
    formularioRegister.style.display = "none";
    containerLR.style.left = "0px";
    formularioLogin.style.display = "block";
    containerRegister.style.display = "block";
    containerLogin.style.display = "none";
  }
}

document.getElementById("btn-iniciar").addEventListener("click", iniciarSesion);

function anchoPagina(){
    if(window.innerWidth > 850){
        containerLogin.style.display = "block"
        containerRegister.style.display = "block"
    }else{
        containerRegister.style.display = "block"
        containerRegister.style.opacity = "1"
        containerLogin.style.display = "none";
        formularioLogin.style.display = "block";
        formularioRegister.style.display = "none";
        containerLR.style.left = "0px";
    }

  
}

