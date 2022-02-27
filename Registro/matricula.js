Vue.component('matricula', {
    data:()=>{
        return {
            buscar:'',
            matriculas:[],
            matricula:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idMatricula : '',
                codigoAlumno : '',
                nombreMateria: '',
                fecha : '',
                Docente: '',
                aula : ''
            }
        }
    },
    methods:{
        buscandoMatricula(){
            this.obtenerMatricula(this.buscar);
        },
        eliminarMatricula(matricula){
            if( confirm(`Esta seguro de elminar el registro ${matricula.nombreMateria}?`)){
                this.matricula.accion = 'eliminar';
                this.matricula.idMatricula = matricula.idMatricula;
                this.guardarMatricula();
            }
            this.nuevoMatricula();

        },
        modificarMatricula(datos){
            this.matricula = JSON.parse(JSON.stringify(datos));
            this.matricula.accion = 'modificar';
        },
        guardarMatricula(){
            this.obtenerMatricula();
            let matriculas = JSON.parse(localStorage.getItem('matriculas')) ||[];
            if(this.matricula.accion=="nuevo"){
                matriculas.push(this.matricula);
            }else if (this.matricula.accion=="modificar"){
                let index = matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                matriculas[index] = this.matricula;
            }else if(this.matricula.accion=="eliminar"){
                let index = matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                matriculas.splice(index,1);
            }
            localStorage.setItem('matriculas', JSON.stringify(matriculas));
            this.nuevoMatricula();
            this.obtenerMatricula();
            this.matricula.msg = 'Registro procesado con exito';
        },
        obtenerMatricula(valor=''){
            this.matriculas = [];
            let matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
            this.matriculas = matriculas.filter(matricula=>matricula.nombreMateria.toLowerCase().indexOf(valor.toLowerCase())>-1);
        },
        nuevoMatricula(){
            this.matricula.accion = 'nuevo';
            this.matricula.msg = '';
            this.matricula.idMatricula = '',
            this.matricula.codigoAlumno = '',
            this.matricula.nombreMateria = '',
            this.matricula.fecha = '',
            this.matricula.Docente = '',
            this.matricula.aula = ''

        }
    },
    created(){
        this.obtenerMatricula();
    },
    template:`
    <div id="appCiente">
    <div class="card text-white" id="carmatricula">
                <div class="card-header bg-info">
                    Registro de matriculas
                  

                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carmatricula" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarmatricula" @reset="nuevomatricula">
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo de alumno:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="matricula.codigoAlumno" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                        <div class="col col-md-2">Nombre de Materia:</div>
                        <div class="col col-md-2">
                            <input title="Ingrese el nombre de la materia" v-model="matricula.nombreMateria" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                        </div>
                    </div>
                        <div class="row p-1">
                        <div class="col col-md-2">Fecha de Inscripcion:</div>
                        <div class="col col-md-3">
                            <input title="Ingrese el dia de inscripcion" v-model="matricula.fecha" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="date" class="form-control">
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Docente:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el nombre del docente" v-model="matricula.Docente" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                            <div class="row p-1">
                            <div class="col col-md-2">Aula:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el aula" v-model="matricula.aula" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="matricula.mostrar_msg" class="alert alert-info alert-dismissible fade show" role="alert">
                                    {{ matricula.msg }}
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
            <div class="card text-white" id="carBuscarmatricula">
                <div class="card-header bg-info">
                    Busqueda de matriculas

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarmatricula" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoMatricula" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CodigoAlumno</th>
                                <th>NombreMateria</th>
                                <th>Fecha</th>
                                <th>DOCENTE</th>
                                <th>Aula</th>
                                
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in matriculas" @click='modificarMatricula( item )' :key="item.idMatricula">
                                <td>{{item.codigoAlumno}}</td>
                                <td>{{item.nombreMateria}}</td>
                                <td>{{item.fecha}}</td>
                                <td>{{item.Docente}}</td>
                                <td>{{item.aula}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarMatricula(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});
    

    