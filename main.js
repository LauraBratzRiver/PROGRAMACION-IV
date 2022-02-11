var db_sistema = openDatabase('dbsistema', '1.0', 'Sistema de Facturacion', 5 * 1024 * 1024);
if(!db_sistema){
    alert('Lo siento tu navegado NO soporta BD locales.');
}
var app = new Vue({
    el: '#appRegistroAcademico',
    data: {
        alumnos: [],
        buscar: '',
        alumno: {
            accion: 'nuevo',
            msg : '',
            idAlumno: '',
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            dui: ''
        },
    },
    methods: {
        buscarAlumno(){
            /*if( this.buscar.trim().length>0 ){
                this.clientes = this.clientes.filter(item=>item.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>=0);
            } else {
                this.obtenerClientes();
            }*/
            this.obtenerAlumno(this.buscar);
        },
        guardarAlumno(){
            let sql = '',
                parametros = [];
            if(this.alumno.accion == 'nuevo'){
                sql = 'INSERT INTO alumnos (codigo, nombre, direccion, telefono, dui) VALUES (?,?,?,?,?)';
                parametros = [this.alumno.codigo,this.alumno.nombre,this.alumno.direccion,this.alumno.telefono,this.alumno.dui];
            }else if(this.alumno.accion == 'modificar'){
                sql = 'UPDATE alumnos SET codigo=?, nombre=?, direccion=?, telefono=?, dui=? WHERE idAlumno=?';
                parametros = [this.alumno.codigo,this.alumno.nombre,this.alumno.direccion,this.alumno.telefono,this.alumno.dui,this.alumno.idAlumno];
            }else if(this.alumno.accion == 'eliminar'){
                sql = 'DELETE FROM alumnos WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
            }
            db_sistema.transaction(tx=>{
                tx.executeSql(sql,
                    parametros,
                (tx, results)=>{
                    this.alumno.msg = 'Registro de alumno procesado con exito';
                    this.nuevoAlumno();
                    this.obtenerAlumno();
                },
                (tx, error)=>{
                    this.alumno.msg = `Error al guardar el alumno ${error.message}`;
                });
            });
        },
        modificarAlumno(alumno){
            this.alumno = alumno;
            this.alumno.accion = 'modificar';
        },
        eliminarAlumno(alumno){
            if( confirm(`¿Esta seguro de eliminar el registro ${alumno.nombre}?`) ){
                this.alumno.idAlumno = alumno.idAlumno;
                this.alumno.accion = 'eliminar';
                this.guardarAlumno();
            }
        },
        obtenerAlumno(busqueda=''){
            db_sistema.transaction(tx=>{
                tx.executeSql(`SELECT * FROM alumnos WHERE nombre like "%${busqueda}%" OR codigo like "%${busqueda}%"`, [], (tx, results)=>{
                    this.clientes = results.rows;
                    /*this.alumnos = [];
                    for(let i=0; i<results.rows.length; i++){
                        this.alumnos.push(results.rows.item(i));
                    }*/
                });
            });
        },
        nuevoAlumno(){
            this.alumno.accion = 'nuevo';
            this.alumno.idAlumno = '';
            this.alumno.codigo = '';
            this.alumno.nombre = '';
            this.alumno.direccion = '';
            this.alumno.telefono = '';
            this.alumno.dui = '';
        }
    },
    created(){
        db_sistema.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS clientes(idCliente INTEGER PRIMARY KEY AUTOINCREMENT, '+
                'codigo char(10), nombre char(75), direccion TEXT, telefono char(10), dui char(10))');
        }, err=>{
            console.log('Error al crear la tabla de clientes', err);
        });
        this.obtenerAlumno();
    }
});