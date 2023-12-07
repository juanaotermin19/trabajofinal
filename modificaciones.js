const URL = "http://juanacodoacodo.pythonanywhere.com/"


const app = Vue.createApp({ 
    data() {
        return {
            codigo: '',
            descripcion: '',
            cantidad: '',
            precio: '',
            mostrarDatosProducto: false,
        };
    },


    methods: {
        obtenerProducto() {
            fetch(URL + 'productos/' + this.codigo)
                .then(response =>  {
                    if (response.ok) {
                        return response.json()
                    } else {
                        //Si la respuesta es un error, lanzamos una excepción para ser "catcheada" más adelante en el catch.
                        throw new Error('Error al obtener los datos del producto.')
                    }
                })


                .then(data => {
                    this.descripcion = data.descripcion;
                    this.cantidad = data.cantidad;
                    this.precio = data.precio;
                    this.mostrarDatosProducto = true;
                })
                .catch(error => {
                    console.log(error);
                    alert('Código no encontrado.');
                })
        },
       
        guardarCambios() {
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('descripcion', this.descripcion);
            formData.append('cantidad', this.cantidad);
            formData.append('precio', this.precio);



            //Utilizamos fetch para realizar una solicitud PUT a la API y guardar los cambios.
            fetch(URL + 'productos/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
            .then(response => {
                //Si la respuesta es exitosa, utilizamos response.json() para parsear la respuesta en formato JSON.
                if (response.ok) {
                    return response.json()
                } else {
                    //Si la respuesta es un error, lanzamos una excepción.
                    throw new Error('Error al guardar los cambios del producto.')
                }
            })
            .then(data => {
                alert('Producto actualizado correctamente.');
                this.limpiarFormulario();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar el producto.');
            });
        },
        limpiarFormulario() {
            this.codigo = '';
            this.descripcion = '';
            this.cantidad = '';
            this.precio = '';
            this.mostrarDatosProducto = false;
        }
    }
});


app.mount('#app');