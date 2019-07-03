const mysql = require('mysql');

const remoteDB = {
    host: 'remotemysql.com',
    user: 'fP7lD5SXM0',
    password: 'EwJqj1myrj',
    database: 'fP7lD5SXM0'
};


const localDB = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestion_ventes'
}

const db = mysql.createConnection(remoteDB);

db.connect( async (err) => {
    if (err) throw err;
    await console.log("connected")
});

module.exports = db;