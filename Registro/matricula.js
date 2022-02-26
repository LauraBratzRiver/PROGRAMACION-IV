Vue.component('matricula',{
    data:()=>{
        return {
            buscar:'',
            matriculas:[],
            matricula:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idMatricula : '',
                codigo_alumno: '',
                dia: '',
                nombre_materia: '',
                docente: '',

            }
        }
    },
    methods:{
        buscandoMatricula(){
            this.obtenerMatricula(this.buscar);
        },
        eliminarMatricula(matricula){
            if( confirm(`Esta seguro de eliminar la matricula ${matricula.nombre}?`) ){
                this.matricula.accion = 'eliminar';
                this.matricula.idMaricula = matricula.idMatricula;
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
            let  matricula = JSON.parse(localStorage.getItem('matricula')) || [];
            if(this.matricula.accion=="nuevo"){
                this.matricula.idMatricula = generarIdUnicoFecha();
                matricula.push(this.matricula);
            } else if(this.matricula.accion=="modificar"){
                let index = matriculas.findIndex(matricula=>matricula.idmatricula==this.matricula.idmatricula);
                matriculas[index] = this.matricula;
            } else if( this.matricula.accion=="eliminar" ){
                let index = matriculas.findIndex(matricula=>matricula.idmatricula==this.matricula.idmatricula);
                matriculas.splice(index,1);
            }
            localStorage.setItem('matriculas', JSON.stringify(matriculas));
            this.nuevomatricula();
            this.obtenermatriculas();
            this.matricula.msg = 'matricula procesado con exito';
        },
        obtenermatriculas(valor=''){
            this.matriculas = [];
            let matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
            this.matriculas = matriculas.filter(matricula=>matricula.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1);
        },
        nuevomatricula(){
            this.matricula.accion = 'nuevo';
            this.matricula.msg = '';
            this.matricula.idmatricula = '';
            this.matricula.codigo_alumno = '';
            this.matricula.dia = '';
            this.matricula.nombre_materia = '';
            this.matricula.docente = '';
           
        }
    },
    created(){
        this.obtenermatriculas();
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
                                <input title="Ingrese el codigo" v-model="matricula.codigo_alumno" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                        <div class="col col-md-2">Dia de Inscripcion:</div>
                        <div class="col col-md-3">
                            <input title="Ingrese el dia de inscripcion" v-model="matricula.dia" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="date" class="form-control">
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Nombre de materia:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el nombre de la materia" v-model="matricula.nombre_materia" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                            <div class="row p-1">
                            <div class="col col-md-2">Docente:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el docente" v-model="matricula.docente" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
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
                                    Buscar: <input @keyup="buscandomatricula" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO_ALUMNO</th>
                                <th>DIA</th>
                                <th>NOMBRE_MATERIA</th>
                                <th>DOCENTE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in matriculas" @click='modificarmatricula( item )' :key="item.idmatricula">
                                <td>{{item.codigo_alumno}}</td>
                                <td>{{item.dia}}</td>
                                <td>{{item.nombre_materia}}</td>
                                <td>{{item.docente}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarmatricula(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});