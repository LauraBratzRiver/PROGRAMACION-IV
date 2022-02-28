Vue.component('alumno',{
    data:()=>{
        return {
            buscar:'',
            alumnos:[],
            alumno:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idAlumno : '',
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                nacimiento: '',
                sexo: ''
            }
        }
    },
    methods:{
        buscandoAlumno(){
            this.obtenerAlumnos(this.buscar);
        },
        eliminarAlumno(alumno){
            if( confirm(`Esta seguro de eliminar el alumno ${alumno.nombre}?`) ){
                this.alumno.accion = 'eliminar';
                this.alumno.idAlumno = alumno.idAlumno;
                this.guardarAlumno();
            }
            this.nuevoAlumno();
        },
        modificarAlumno(datos){
            this.alumno = JSON.parse(JSON.stringify(datos));
            this.alumno.accion = 'modificar';
        },
        guardarAlumno(){
            this.obtenerAlumnos();
            let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
            if(this.alumno.accion=="nuevo"){
                this.alumno.idAlumno = generarIdUnicoFecha();
                alumnos.push(this.alumno);
            } else if(this.alumno.accion=="modificar"){
                let index = alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                alumnos[index] = this.alumno;
            } else if( this.alumno.accion=="eliminar" ){
                let index = alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                alumnos.splice(index,1);
            }
            localStorage.setItem('alumnos', JSON.stringify(alumnos));
            this.nuevoAlumno();
            this.obtenerAlumnos();
            this.alumno.msg = 'Alumno procesado con exito';
        },
        obtenerAlumnos(valor=''){
            this.alumnos = [];
            let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
            this.alumnos = alumnos.filter(alumno=>alumno.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1);
        },
        nuevoAlumno(){
            this.alumno.accion = 'nuevo';
            this.alumno.msg = '';
            this.alumno.idAlumno = '';
            this.alumno.codigo = '';
            this.alumno.nombre = '';
            this.alumno.direccion = '';
            this.alumno.telefono = '';
            this.alumno.nacimiento = '';
            this.alumno.sexo = '';
        }
    },
    created(){
        this.obtenerAlumnos();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carAlumno">
                <div class="card-header bg-info">
                    Registro de Alumnos

                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carAlumno" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarAlumno" @reset="nuevoAlumno">
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="alumno.codigo" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Nombre:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el nombre" v-model="alumno.nombre" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Direccion:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la direccion" v-model="alumno.direccion" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Telefono:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el tel" v-model="alumno.telefono" pattern="[0-9]{4}-[0-9]{4}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">NACIMIENTO:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el NACIMIENTO" v-model="alumno.nacimiento" pattern="[0-9]{2}{4}-[0-9]{2,4}" required type="date" class="form-control">
                            </div>
                            <div class="row p-1">
                            <div class="col col-md-2">SEXO:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el sexo" v-model="alumno.sexo" pattern="[Masculino-Femenino]{1,2}" required type="sex" class="form-control">
                
                         </div>
                        </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="alumno.mostrar_msg" class="alert alert-info alert-dismissible fade show" role="alert">
                                    {{ alumno.msg }}
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
            <div class="card text-white" id="carBuscarAlumno">
                <div class="card-header bg-info">
                    Busqueda de Alumnos

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarAlumno" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoAlumno" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>DIRECCION</th>
                                <th>TEL</th>
                                <th>NACIMIENTO</th>
                                <th>SEXO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in alumnos" @click='modificarAlumno( item )' :key="item.idAlumno">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.direccion}}</td>
                                <td>{{item.telefono}}</td>
                                <td>{{item.nacimiento}}</td>
                                <td>{{item.sexo}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarAlumno(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});