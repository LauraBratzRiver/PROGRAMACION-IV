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
            if(this.cliente.accion == 'nuevo'){
                sql = 'INSERT INTO clientes (codigo, nombre, direccion, telefono, dui) VALUES (?,?,?,?,?)';
                parametros = [this.cliente.codigo,this.cliente.nombre,this.cliente.direccion,this.cliente.telefono,this.cliente.dui];
            }else if(this.cliente.accion == 'modificar'){
                sql = 'UPDATE clientes SET codigo=?, nombre=?, direccion=?, telefono=?, dui=? WHERE idCliente=?';
                parametros = [this.cliente.codigo,this.cliente.nombre,this.cliente.direccion,this.cliente.telefono,this.cliente.dui,this.cliente.idCliente];
            }else if(this.cliente.accion == 'eliminar'){
                sql = 'DELETE FROM clientes WHERE idCliente=?';
                parametros = [this.cliente.idCliente];
            }
            db_sistema.transaction(tx=>{
                tx.executeSql(sql,
                    parametros,
                (tx, results)=>{
                    this.cliente.msg = 'Cliente procesado con exito';
                    this.nuevoCliente();
                    this.obtenerClientes();
                },
                (tx, error)=>{
                    this.cliente.msg = `Error al guardar el cliente ${error.message}`;
                });
            });
        },
        modificarAlumno(alumno){
            this.cliente = cliente;
            this.cliente.accion = 'modificar';
        },
        eliminarAlumno(alumno){
            if( confirm(`¿Esta seguro de eliminar el cliente ${cliente.nombre}?`) ){
                this.cliente.idCliente = cliente.idCliente;
                this.cliente.accion = 'eliminar';
                this.guardarCliente();
            }
        },
        obtenerAlumno(busqueda=''){
            db_sistema.transaction(tx=>{
                tx.executeSql(`SELECT * FROM clientes WHERE nombre like "%${busqueda}%" OR codigo like "%${busqueda}%"`, [], (tx, results)=>{
                    this.clientes = results.rows;
                    /*this.clientes = [];
                    for(let i=0; i<results.rows.length; i++){
                        this.clientes.push(results.rows.item(i));
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