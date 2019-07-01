const db = require("../database/connection.db");

const clientTable = {
  table: "clients",
  clientId: "client_id",
  nomComplet: "nom_complet",
  ville: "ville",
  tel: "tel"
}

class ClientDao {

  addClient(nomComplet, ville, tel, resolve) {

    const sql = `INSERT INTO ${clientTable.table} 
    (${clientTable.nomComplet}, ${clientTable.ville}, ${clientTable.tel}) 
    VALUES ('${nomComplet}', '${ville}', '${tel}') `;

    db.query(sql, (err, rows) => {
      resolve({
        error: err ? err : "",
        result: err ? "" : "un client a été bien inséré"
      });
    });
  }

  updateClient(clientId, nomComplet, ville, tel, resolve) {

    const sql = `update ${clientTable.table} set 
    ${clientTable.nomComplet} = '${nomComplet}', 
    ${clientTable.ville} = '${ville}', 
    ${clientTable.tel} = '${tel}'
    where ${clientTable.clientId} = ${clientId}
    `;

    db.query(sql, (err, rows) => {
      resolve({
        error: err ? err : "",
        result: err ? "" : "un client a été bien modifié"
      });
    });
  }

  deleteClient(clientId, resolve) {

    const sql = `delete from ${clientTable.table}
    where ${clientTable.clientId} = ${clientId}`;

    db.query(sql, (err, rows) => {
      resolve({
        error: err ? err : "",
        result: err ? "" : "un client a été bien supprimé"
      });
    });
  }

  getClientById(clientId, resolve) {

    const sql = `select * from ${clientTable.table}
    where ${clientTable.clientId} = ${clientId}`;

    db.query(sql, (err, rows) => {
      resolve({ error: err ? err : "", result: err ? "" : rows[0] });
    });
  }

  getClients(resolve) {
    const sql = `select * from ${clientTable.table}`;
    db.query(sql, (err, rows) => {
      resolve({ error: err ? err : "", result: err ? "" : rows });
    });
  }
}


module.exports = new ClientDao();
