import cargarVideos from "./cargar";

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
    else{ 
        const url = `https://content.googleapis.com/youtube/v3/playlistItems?playlistId=${key}&maxResults=50&part=id,snippet&key=AIzaSyBrRW4C0lEh8adG0sZI2FOQXCKMDxCNL1Q`;
        cargar(url);
    }
    
    }

    else{
        alert('¡Ingresa un Id!');  //valida si se ingreso un ID
    }
   
}

const fetchVideo = async(url) =>{ //Hace llamado al Api y devuelve un json
    try{
    const respuesta =  await fetch(url);
    const datos = await respuesta.json();
    return datos.items;
    }catch(error){
        console.log(error);
    }
}

const cargar = async (url) =>{ // Carga la lista de reproduccion en base a los datos obtenidos anteriormente
    const resultados = await fetchVideo(url);
    cargarVideos(resultados);
};

obtenerTexto();




