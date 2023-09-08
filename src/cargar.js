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
            };
        });
    });
   }
   else{
    alert('Ocurrio un error al buscar la Playlist');
   }
};
/*
La clase activa es la que hace ver que video se esta reproduciendo
cuando un elemento tiene la clase cambian las letras a color blanco 
cuando se le quita la clase activa las letras volverán a ser gris
*/
export default cargarVideos;