const Client = require('mysql').client;
const mysqlConfig = {
    user: "root",
    password: "root3306",
    database: "linrui",
    port: 3306
}

class mysql {
    constructor() {
        this.client = new Client();
        this.client.user = mysqlConfig.user;
        this.client.password = mysqlConfig.password;

        this.connectMysql();
    }

    //连接mysql
    connectMysql() {
        this.client.connect((err, result) => {
            if (err) {
                console.error('connection error: ' + err.message);
                return;
            }
            console.log('connection +-success!!!');
            this.connectDatabase();
        })
    }

    //连接数据库
    connectDatabase() {
        this.client.query("")
    }
}