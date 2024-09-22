import data from './data.js';


//---Slider de la pagina---

//Variables del slider

let cartas= document.querySelectorAll('.slider .carta');
let siguiente=document.getElementById("siguiente");
let anterior= document.getElementById("anterior");
let vistaPrevia= document.querySelectorAll('.vistaPrevia .carta');


let conteoCarta= cartas.length;
let cartaA= 0;

//Eventos del slider

siguiente.onclick= function(){
    cartaA=cartaA + 1;
    if(cartaA>=conteoCarta){
        cartaA=0;
    }
    mostrarSlider();
}

//Cambio automatico de imagen del slider

let refrescarIntervalo= setInterval(()=>{
    siguiente.click();
}, 6000)


function mostrarSlider(){
    let cartaAOld= document.querySelector('.slider .lista .carta.A');
    let vistaPrevAOld= document.querySelector('.vistaPrevia .carta.A');
    cartaAOld.classList.remove('A');
    vistaPrevAOld.classList.remove('A');

    cartas[cartaA].classList.add('A');
    vistaPrevia[cartaA].classList.add('A');

    clearInterval(refrescarIntervalo);
    refrescarIntervalo= setInterval(()=>{
        siguiente.click();
    }, 8000)

}

anterior.onclick=function(){
    cartaA=cartaA - 1;
    if(cartaA<0){
        cartaA=conteoCarta - 1;
    }
    mostrarSlider();
}


vistaPrevia.forEach((vistaPrevia, index)=>{
    vistaPrevia.addEventListener('click',()=>{
        cartaA=index;
        mostrarSlider();
    })
})


//Script de la pagina

const moviesAndSeries=data;

mostrarHTML(moviesAndSeries);

//Eventos

document.getElementById("mostrarTodo").addEventListener("click",function(){
    mostrarTodas(moviesAndSeries)
})

document.getElementById("ordenarAlfaA-Z").addEventListener("click", function(){
    ordenarAlfaA_Z(moviesAndSeries);
})

document.getElementById("ordenarAlfaZ-A").addEventListener("click", function(){
    ordenarAlfaZ_A(moviesAndSeries);
})

document.getElementById("tipo").addEventListener("click",function(){
    filtrarPorTipo(moviesAndSeries, document.getElementById("tipo").value);
})

document.getElementById("buscar").addEventListener("input",function(){
    filtrarPorTitulo(moviesAndSeries, document.getElementById("buscar").value.toLowerCase());
})

//Funciones

function mostrarTodas(moviesAndSeries){
    mostrarHTML(moviesAndSeries);
}

function ordenarAlfaA_Z(moviesAndSeries){
    const ordenadosAlfa=moviesAndSeries.slice();
    ordenadosAlfa.sort(function(a,b){return a.titulo.localeCompare(b.titulo)});
    mostrarHTML(ordenadosAlfa);
}

function ordenarAlfaZ_A(moviesAndSeries){
    const ordenadosAlfa=moviesAndSeries.slice();
    ordenadosAlfa.sort(function(a,b){return a.titulo.localeCompare(b.titulo)});
    mostrarHTML(ordenadosAlfa.reverse());
}

function filtrarPorTipo(moviesAndSeries, tipo){
    const filtradoPorTipo= moviesAndSeries.filter(function(movie){return movie.tipo.includes(tipo)});
    mostrarHTML(filtradoPorTipo);
}

function filtrarPorTitulo(moviesAndSeries, title){
    const filtradoPorTitulo=moviesAndSeries.filter(function(movie){return movie.titulo.toLowerCase().includes(title)});
    mostrarHTML(filtradoPorTitulo);
}

//Funcion mostrar en HTML

function mostrarHTML(moviesAndSeries){
    document.getElementById("container").innerHTML="";
    for(let i=0;i<moviesAndSeries.length;i++){
        document.getElementById("container").innerHTML+=`
         <article class="card">
                    <img src="${moviesAndSeries[i].imagen}" alt="Poster de pelicula">
                    <div class="name">${moviesAndSeries[i].titulo}</div>
                    <img src="${moviesAndSeries[i].imagen2}" alt="Imagen emergente">
                </article>
        `
    }
}
