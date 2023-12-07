function traerDatosAPI(){
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => { 
            console.log(data)         
            contenido.innerHTML= `
            <img src="${data.message}"></img>`
        }); 
}
