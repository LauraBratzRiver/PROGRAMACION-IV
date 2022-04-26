Vue.component('clientes',{
    data:()=>{
        return {
            buscar:'',
            Clientes:[],
            cliente:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idcliente : '',
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                automotor: ''
            }
        }
    },
    methods:{
        buscandocliente(){
            this.obtenerClientes(this.buscar);
        },
        eliminarcliente(cliente){
            if( confirm(`Esta seguro de eliminar el cliente ${cliente.nombre}?`) ){
                this.cliente.accion = 'eliminar';
                this.cliente.idcliente = cliente.idcliente;
                this.guardarcliente();
            }
            this.nuevocliente();
        },
        modificarcliente(datos){
            this.cliente = JSON.parse(JSON.stringify(datos));
            this.cliente.accion = 'modificar';
        },
        guardarcliente(){
            this.obtenerClientes();
            let Clientes = JSON.parse(localStorage.getItem('Clientes')) || [];
            if(this.cliente.accion=="nuevo"){
                this.cliente.idcliente = generarIdUnicoFecha();
                Clientes.push(this.cliente);
            } else if(this.cliente.accion=="modificar"){
                let index = Clientes.findIndex(cliente=>cliente.idcliente==this.cliente.idcliente);
                Clientes[index] = this.cliente;
            } else if( this.cliente.accion=="eliminar" ){
                let index = Clientes.findIndex(cliente=>cliente.idcliente==this.cliente.idcliente);
                Clientes.splice(index,1);
            }
            localStorage.setItem('Clientes', JSON.stringify(Clientes));
            this.nuevocliente();
            this.obtenerClientes();
            this.cliente.msg = 'cliente procesado con exito';
        },
        obtenerClientes(valor=''){
            this.Clientes = [];
            let Clientes = JSON.parse(localStorage.getItem('Clientes')) || [];
            this.Clientes = Clientes.filter(cliente=>cliente.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1);
        },
        nuevocliente(){
            this.cliente.accion = 'nuevo';
            this.cliente.msg = '';
            this.cliente.idcliente = '';
            this.cliente.codigo = '';
            this.cliente.nombre = '';
            this.cliente.direccion = '';
            this.cliente.telefono = '';
            this.cliente.automotor = '';
        }
    },
    created(){
        this.obtenerClientes();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carcliente">
                <div class="card-header bg-info">
                    Registro de Clientes

                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carcliente" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarcliente" @reset="nuevocliente">
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="cliente.codigo" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Nombre:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el nombre" v-model="cliente.nombre" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Direccion:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la direccion" v-model="cliente.direccion" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Telefono:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el tel" v-model="cliente.telefono" pattern="[0-9]{4}-[0-9]{4}" required type="text" class="form-control">
                            </div>
                        </div>
                    
                            <div class="row p-1">
                            <div class="col col-md-2">AUTOMOTOR:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese tipo de automotor" v-model="cliente.automotor" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
                
                         </div>
                        </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="cliente.mostrar_msg" class="alert alert-info alert-dismissible fade show" role="alert">
                                    {{ cliente.msg }}
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
            <div class="card text-white" id="carBuscarcliente">
                <div class="card-header bg-info">
                    Busqueda de Clientes

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarcliente" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandocliente" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>DIRECCION</th>
                                <th>TEL</th>
                                <th>AUTOMOTOR</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in Clientes" @click='modificarcliente( item )' :key="item.idcliente">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.direccion}}</td>
                                <td>{{item.telefono}}</td>
                                <td>{{item.automotor}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarcliente(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});