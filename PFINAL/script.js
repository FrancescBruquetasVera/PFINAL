window.addEventListener('load',iniciar,false);

/*Contador inicializado en cero*/
var contador=0;

function iniciar(){
    setInterval('cambiarImg()',2000);
}

var obj=document.getElementById('slider');
var obj2=obj.getElementsByTagName('img');

function cambiarManual(sentido)
{
    if (sentido=="DER") {
        obj2[contador].style.opacity=0;
        if (contador<obj2.length-1) 
        {
            contador++;
            obj2[contador].style.opacity=1;
            console.log('Contador vale ' + contador + ' Longitud ' + obj2.length);
        }
        else
        {
            contador=0;
            obj2[contador].style.opacity=1;
            console.log('Contador vale ' + contador + ' Longitud ' + obj2.length);
        }
    }
    else if (sentido=="IZQ") 
    {
        obj2[contador].style.opacity=0;
        if (contador!=0) 
        {
            contador--;
            obj2[contador].style.opacity=1;
        }
        else
        {
            contador=obj2.length-1;
            obj2[contador].style.opacity=1;
        }
    }
}

function cambiarImg(){	        

    if(contador==obj2.length){
        for(var i=0; i<obj2.length; i++){
            obj2[i].style.opacity='0';
            contador--;
        }
        obj2[contador].style.opacity='1';
    }
    else
    {
        obj2[contador].style.opacity='1';
        contador++;
    }
    
}

document.getElementById("btn__registrarse").addEventListener("click", register);
document.getElementById("btn__iniciar-sesion").addEventListener("click", IniciarSesion);
//declaración de variables
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

function register(){
    
    formulario_register.style.display="block";
    contenedor_login_register.style.left = "410px";
    formulario_login.style.display ="none";
    caja_trasera_register.style.opacity ="0";
    caja_trasera_login.style.opacity= "1";

}

function IniciarSesion(){
    
    formulario_register.style.display="none";
    contenedor_login_register.style.left = "10px";
    formulario_login.style.display ="block";
    caja_trasera_register.style.opacity ="1";
    caja_trasera_login.style.opacity= "0";

}