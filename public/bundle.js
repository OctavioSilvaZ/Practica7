'use strict';

const cargarVideos = (resultados) => {
    const contenedor = document.querySelector('#contenedorVideo .video-list');
    let elementoActivo = null;
    let mainVideo = document.querySelector('#idiframe'); //Selecciona el iframe del html
    let title = document.querySelector('.main-video .title'); //Selecciona el titulo del iframe
    if(resultados){
    resultados.forEach((respuesta, index) => {
        if (index === 0) { //crea un div dinamicamente el cual se le asignará la clase activa
            const plantilla = ` <div class="vid active"> 
                <h3 class="title">${index + 1}.- </h3>
                <img src="${respuesta.snippet.thumbnails.default.url}"></img>
                <h3 class="title">${respuesta.snippet.title} </h3>
            </div>`;
            contenedor.insertAdjacentHTML('beforeend', plantilla); //Ingresa la plantilla al contenedor

            // Establece el primer elemento como activo
            elementoActivo = contenedor.lastElementChild;
            const video2 = respuesta.snippet.resourceId.videoId;
            mainVideo.src = `https://www.youtube.com/embed/${video2}?autoplay=1`;
            title.innerHTML = respuesta.snippet.title;
        } else {           
            // agrega los demas resultados encontrados pero la diferencia es que no tiene la clase activa
            const plantilla = ` <div class="vid">  
                <h3 class="title">${index + 1}.- </h3>
                <img src="${respuesta.snippet.thumbnails.default.url}"></img>
                <h3 class="title">${respuesta.snippet.title} </h3>
            </div>`;
            contenedor.insertAdjacentHTML('beforeend', plantilla);
        }

        const videoElement = contenedor.lastElementChild;
        videoElement.addEventListener('click', () => {
            // Quita la clase 'active' del elemento anterior
            if (elementoActivo) {
                elementoActivo.classList.remove('active');
            }

            // Agrega la clase 'active' al elemento actual
            videoElement.classList.add('active');
            elementoActivo = videoElement;
            if(videoElement.classList.contains('active')){
                const videoId = respuesta.snippet.resourceId.videoId;
                const src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                // Cambiar el src del iframe principal
                mainVideo.src =src;
                title.innerHTML = respuesta.snippet.title;
                console.log(src);
            }        });
    });
   }
   else {
    alert('Ocurrio un error al buscar la Playlist');
   }
};

// Obtinene el evento onclick donde recupera el ID ingresado
const  obtenerTexto = () => {
    let key = document.getElementById("recuperaID").value; // Recupera id de contenedor principal (contenedorInicial)
    let key2 = document.getElementById("recuperaID2").value;// Recupera id de contenedor secundario (contenedorVideo)
    if(!key == "" ){
    const contenedor1 = document.querySelector('#contenedorInicial');
    contenedor1.style.display = 'none';  // Oculta el contenedor principal

    const navegacion = document.querySelector('#navegacion');
    navegacion.style.visibility = 'visible'; //Hace visible el header para barra de busqueda superior
  
    const contenedor2 = document.querySelector('#contenedorVideo');
    contenedor2.style.display = 'grid'; // hace visible el contenedor con el resultado de la id de la play list

    const videoListContainer = document.querySelector('.video-list');
    videoListContainer.innerHTML = ''; //Actualiza lista de videos

    if(!key2 == ""){ // obtiene id del segundo contenedor 
    const url = `https://content.googleapis.com/youtube/v3/playlistItems?playlistId=${key2}&maxResults=50&part=id,snippet&key=AIzaSyBrRW4C0lEh8adG0sZI2FOQXCKMDxCNL1Q`;
    cargar(url);
    }
    else { 
        const url = `https://content.googleapis.com/youtube/v3/playlistItems?playlistId=${key}&maxResults=50&part=id,snippet&key=AIzaSyBrRW4C0lEh8adG0sZI2FOQXCKMDxCNL1Q`;
        cargar(url);
    }
    
    }

    else {
        alert('¡Ingresa un Id!');  //valida si se ingreso un ID
    }
   
};

const fetchVideo = async(url) =>{ //Hace llamado al Api y devuelve un json
    try{
    const respuesta =  await fetch(url);
    const datos = await respuesta.json();
    return datos.items;
    }catch(error){
        console.log(error);
    }
};

const cargar = async (url) =>{ // Carga la lista de reproduccion en base a los datos obtenidos anteriormente
    const resultados = await fetchVideo(url);
    cargarVideos(resultados);
};

obtenerTexto();
