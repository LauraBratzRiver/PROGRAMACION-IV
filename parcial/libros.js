Vue.component('libros', {
    data:()=>{
        return {
            libros: [],
            buscar: '',
            libro: {
                accion: 'nuevo',
                msg : '',
                idLibro: '',
                idAutor: '',
                ISBN: '',
                titulo: '',
                editorial: '',
                edicion: ''
            }
        }
    },
    methods: {
        buscarlibros(){
            this.obtenerDatos(this.buscar);
        },
        guardarLibros(){
            this.obtenerDatos();
            let libros = this.libros || [];
            if( this.libro.accion == 'nuevo' ){
                this.libro.idLibro = idUnicoFecha();
                libros.push(this.libro);
            }else if( this.libro.accion == 'modificar' ){
                let index = libros.findIndex(libro=>libro.idLibro==this.libro.idLibro);
                libros[index] = this.libro;
            }else if( this.libro.accion == 'eliminar' ){
                let index = libros.findIndex(libro=>libro.idLibro==this.libro.idLibro);
                libros.splice(index,1);
            }
            localStorage.setItem('libros', JSON.stringify(libros));
            this.libro.msg = 'Libro procesado con exito';
            this.nuevoLibro();
            this.obtenerDatos();
        },
        modificarLibro(data){
            this.libro = JSON.parse(JSON.stringify(data));
            this.libro.accion = 'modificar';
        },
        eliminarLibro(data){
            if( confirm(`¿Esta seguro de eliminar el registro ${data.nombre}?`) ){
                this.libro.idLibro = data.idLibro;
                this.libro.accion = 'eliminar';
                this.guardarLibros();
            }
        },
        obtenerDatos(busqueda=''){
            this.libros = [];
            if( localStorage.getItem('libros')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('libros')).length; i++){
                    let data = JSON.parse(localStorage.getItem('libros'))[i];
                    if( this.buscar.length>0 ){
                        if( data.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ){
                            this.libros.push(data);
                        }
                    }else{
                        this.autores.push(data);
                    }
                }
            }
        },
        nuevoLibro(){
            this.libro.accion = 'nuevo';
            this.libro.idLibro = '';
            this.libro.idAutor = '';
            this.libro.ISBN = '';
            this.libro.titulo = '';
            this.libro.editorial = '';
            this.libro.edicion = '';
            this.autor.msg = '';
        }
    }, 
    created(){
        this.obtenerDatos();
    },
    template: `
        <div id='appLibros'>
            <form @submit.prevent="guardarLibros" @reset.prevent="nuevoLibro" method="post" id="frmLibro">
                <div class="card mb-3">
                    <div class="card-header text-white bg-dark">
                        Administracion de Libros
                        <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#frmLibro" aria-label="Close"></button>
                    </div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-1">idLibro</div>
                            <div class="col col-md-2">
                                <input v-model="libro.idLibro" placeholder="codigo" pattern="[A-Z0-9]{3,10}" required title="Id de libro" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">idAutor</div>
                            <div class="col col-md-2">
                                <input v-model="libro.idLibro" placeholder="escribe el id del autor" pattern="[A-Z0-9]{3,10}" required title="id de autor" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                        <div class="col col-md-1">ISBN</div>
                        <div class="col col-md-2">
                            <input v-model="libro.ISBN" placeholder="ISBN" pattern="[A-Z0-9]{3,10}" required title="ISBN de libro" class="form-control" type="text">
                        </div>
                    </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Titulo</div>
                            <div class="col col-md-2">
                                <input v-model="libro.titulo" placeholder="titulo de libro" pattern="[A-Za-z0-9Ññáéíóú ]{3,100}" required title="Nombre de libro" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">editorial</div>
                            <div class="col col-md-2">
                                <input v-model="libro.editorial" placeholder="editorial de libro" pattern="[A-Za-z0-9Ññáéíóú ]{3,100}" required title="Editorial de libro" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">edicion</div>
                            <div class="col col-md-2">
                                <input v-model="libro.edicion" placeholder="escribe la edicion" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="edicion de libro" class="form-control" type="text">
                            </div>
                        </div>
                       
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    {{ libro.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <button type="submit" class="btn btn-primary">Guardar</button>
                                <button type="reset" class="btn btn-warning">Nuevo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="card mb-3" id="cardBuscarCliente">
                <div class="card-header text-white bg-dark">
                    Busqueda de Clientes
                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarCliente" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td colspan="6">
                                    Buscar: <input title="Introduzca el texto a buscar" @keyup="buscarCliente" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr>
                                <th>idLibro</th>
                                <th>idAutor</th>
                                <th>ISBN</th>
                                <th>Titulo</th>
                                <th>editorial</th>
                                <th>edicion</th>
                                
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in libros" :key="item.idLibro" @click="modificarLibro(item)">
                                <td>{{item.idLibro}}</td>
                                <td>{{item.idAutor}}</td>
                                <td>{{item.titulo}}</td>
                                <td>{{item.editorial}}</td>
                                <td>{{item.edicion}}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarLibro(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});