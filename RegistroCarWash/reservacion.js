Vue.component('reservacion', {
    data:()=>{
        return {
            buscar:'',
            reservaciones:[],
            reservacion:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idreservacion : '',
                codigo: '',
                nombre: '',
                fecha : '',
                hora : '',
                TipoReservacion : '',
            }
        }
    },
    methods:{
        buscandoreservacion(){
            this.obtenerreservacion(this.buscar);
        },
        eliminarreservacion(reservacion){
            if( confirm(`Esta seguro de elminar el registro ${reservacion.nombreMateria}?`)){
                this.reservacion.accion = 'eliminar';
                this.reservacion.idreservacion = reservacion.idreservacion;
                this.guardarreservacion();
            }
            this.nuevoreservacion();

        },
        modificarreservacion(datos){
            this.reservacion = JSON.parse(JSON.stringify(datos));
            this.reservacion.accion = 'modificar';
        },
        guardarreservacion(){
            this.obtenerreservacion();
            let reservaciones = JSON.parse(localStorage.getItem('reservaciones')) ||[];
            if(this.reservacion.accion=="nuevo"){
                reservaciones.push(this.reservacion);
            }else if (this.reservacion.accion=="modificar"){
                let index = reservaciones.findIndex(reservacion=>reservacion.idreservacion==this.reservacion.idreservacion);
                reservaciones[index] = this.reservacion;
            }else if(this.reservacion.accion=="eliminar"){
                let index = reservaciones.findIndex(reservacion=>reservacion.idreservacion==this.reservacion.idreservacion);
                reservaciones.splice(index,1);
            }
            localStorage.setItem('reservaciones', JSON.stringify(reservaciones));
            this.nuevoreservacion();
            this.obtenerreservacion();
            this.reservacion.msg = 'Registro procesado con exito';
        },
        obtenerreservacion(valor=''){
            this.reservaciones = [];
            let reservaciones = JSON.parse(localStorage.getItem('reservaciones')) || [];
            this.reservaciones = reservaciones.filter(reservacion=>reservacion.TipoReservacion.toLowerCase().indexOf(valor.toLowerCase())>-1);
        },
        nuevoreservacion(){
            this.reservacion.accion = 'nuevo';
            this.reservacion.msg = '';
            this.reservacion.idreservacion = '',
            this.reservacion.codigo = '',
            this.reservacion.nombre = '',
            this.reservacion.fecha = '',
            this.reservacion.hora = '',
            this.reservacion.TipoReservacion = '';

        }
    },
    created(){
        this.obtenerreservacion();
    },
    template:`
    <div id="appCiente">
    <div class="card text-white" id="carreservacion">
                <div class="card-header bg-info">
                    Registro de reservaciones
                  

                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carreservacion" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarreservacion" @reset="nuevoreservacion">
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo de cliente:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="reservacion.codigoCliente" pattern="[0-9]{3,10}" required type="text" class="form-control">
                                
                            </div>
                        </div>
                        <div class="row p-1">
                        <div class="col col-md-2">Nombre de Cliente:</div>
                        <div class="col col-md-2">
                            <input title="Ingrese el nombre del cliente" v-model="reservacion.nombreCliente" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                              
                            </div>

                            <div class="row p-1">
                            <div class="col col-md-2">Fecha de Reservacion:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el nombre del cliente" v-model="reservacion.fecha" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                                  
                                </div>
                    </div>
                       
                    </div>
                       
                       
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="reservacion.mostrar_msg" class="alert alert-info alert-dismissible fade show" role="alert">
                                    {{ reservacion.msg }}
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
            <div class="card text-white" id="carBuscarreservacion">
                <div class="card-header bg-info">
                    Busqueda de reservaciones

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarreservacion" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoreservacion" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CodigoCliente</th>
                            
                                <th>Fecha</th>
                              
                                
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in reservaciones" @click='modificarreservacion( item )' :key="item.idreservacion">
                                <td>{{item.codigoCliente}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.fecha}}</td>

                                <td>
                                    <button class="btn btn-danger" @click="eliminarreservacion(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});
    

    