Vue.component('registro',{
    data:()=>{
        return {
            buscar:'',
            registros:[],
            registro:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idregistro : '',
                codigo: '',
                nombre: '',
                docente: '',

            }
        }
    },
    methods:{
        buscandoregistro(){
            this.obtenerregistros(this.buscar);
        },
        eliminarregistro(registro){
            if( confirm(`Esta seguro de eliminar el registro ${registro.nombre}?`) ){
                this.registro.accion = 'eliminar';
                this.registro.idregistro = registro.idregistro;
                this.guardarregistro();
            }
            this.nuevoregistro();
        },
        modificarregistro(datos){
            this.registro = JSON.parse(JSON.stringify(datos));
            this.registro.accion = 'modificar';
        },
        guardarregistro(){
            this.obtenerregistros();
            let registros = JSON.parse(localStorage.getItem('registros')) || [];
            if(this.registro.accion=="nuevo"){
                this.registro.idregistro = generarIdUnicoFecha();
                registros.push(this.registro);
            } else if(this.registro.accion=="modificar"){
                let index = registros.findIndex(registro=>registro.idregistro==this.registro.idregistro);
                registros[index] = this.registro;
            } else if( this.registro.accion=="eliminar" ){
                let index = registros.findIndex(registro=>registro.idregistro==this.registro.idregistro);
                registros.splice(index,1);
            }
            localStorage.setItem('registros', JSON.stringify(registros));
            this.nuevoregistro();
            this.obtenerregistros();
            this.registro.msg = 'registro procesado con exito';
        },
        obtenerregistros(valor=''){
            this.registros = [];
            let registros = JSON.parse(localStorage.getItem('registros')) || [];
            this.registros = registros.filter(registro=>registro.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1);
        },
        nuevoregistro(){
            this.registro.accion = 'nuevo';
            this.registro.msg = '';
            this.registro.idregistro = '';
            this.registro.codigo = '';
            this.registro.nombre = '';
            this.registro.docente = '';
        }
    },
    created(){
        this.obtenerregistros();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carregistro">
                <div class="card-header bg-info">
                    Registro de registros

                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carregistro" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarregistro" @reset="nuevoregistro">
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="registro.codigo" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Nombre:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el nombre" v-model="registro.nombre" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                            <div class="row p-1">
                            <div class="col col-md-2">Docente:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el docente" v-model="registro.docente" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="registro.mostrar_msg" class="alert alert-info alert-dismissible fade show" role="alert">
                                    {{ registro.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-2">
                            <div class="col col-md-5 text-center">
                                <input class="btn btn-success" type="submit" value="Guardar">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white" id="carBuscarregistro">
                <div class="card-header bg-info">
                    Busqueda de registros

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarregistro" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoregistro" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>DOCENTE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in registros" @click='modificarregistro( item )' :key="item.idregistro">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.docente}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarregistro(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});