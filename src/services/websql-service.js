export default class Database {
    constructor(){
        this.db = openDatabase('random_chat', '1.0','web database', 2 * 1024 * 1024);
        
        this.createTableBlackList();
        this.createTableUsers();
    }

    // create table dynamic coming soon
    createTableBlackList(){
        const query = `CREATE TABLE IF NOT EXISTS black_list(id unique,chipher,email,exceeded_reset,time_start)`;
        this.db.transaction(exec => exec.executeSql(query));
    }
    createTableUsers(){
        const query = `CREATE TABLE IF NOT EXISTS users(id unique,name,email unique,photo,password)`;
        this.db.transaction(exec => exec.executeSql(query));
    }
    insertTableUsers(user){
        const query = `INSERT INTO users(id,name,email,photo,password)VALUES(?,?,?,?,?)`;
        const array = [user.id,user.name,user.email,user.photo,user.password];
        this.db.transaction(exec => exec.executeSql(query, array));
    }
    insertTable(table, payload){
        this.db.transaction((exec) => {
            const query = `INSERT INTO ${table}(id,chipher,email,exceeded_reset,time_start)VALUES(?,?,?,?,?)`;
            const array = [payload.id,payload.chipher,payload.email,payload.exceeded_reset,payload.time_start];
            exec.executeSql(query, array);
        });
    }
    select(table){
        return new Promise(resolve => {
            const register = [];
            this.db.transaction(exec => {
                exec.executeSql(`SELECT * FROM ${table}`, [], (tx, result) => {
                    for(let i = 0; i < result.rows.length; i++){
                        register.push(result.rows.item(i));
                    }
                }, null);
            });
            setTimeout(() => resolve(register), 300);
        });
    }
    selectByEmail(table, email){
        return new Promise(resolve => {
            this.db.transaction(exec => {
                const query = `SELECT * FROM ${table} WHERE email=?`;
                exec.executeSql(query, [email], (tx, result) => {
                    (result.rows.length > 0) ? resolve(result.rows[0]) : resolve(null);
                }, null);
            });
        });
    }
    delete(table, email){
        this.db.transaction(exec => {
            const query = `DELETE FROM ${table} WHERE email=?`;
            exec.executeSql(query, [email]);
        });
    }
    dropTable(table){
        this.db.transaction(exec => {
            exec.executeSql(`DROP TABLE ${table}`, [], 
                (exec,results) => console.info("Table Dropped"),
                (exec,error) => console.error("Error: " + error.message)
            );
       });
    }
}