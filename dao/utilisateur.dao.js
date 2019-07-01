const db = require("../database/connection.db");

const utilisateurTable = {
  table: "utilisateur",
  utilisateur_id: "utilisateur_id",
  nom_complet: "nom_complet",
  email: "email",
  password: "password"
};

class UtilisateurDao {

  updateUser(userId, nomcomplet, email, password, resolve) {

    const sql = `update ${utilisateurTable.table} set
    ${utilisateurTable.nom_complet} = '${nomcomplet}' ,
    ${utilisateurTable.email} = '${email}' ,
    ${utilisateurTable.password} = '${password}'
    where ${utilisateurTable.utilisateur_id} = ${userId} `;

    db.query(sql, (err, rows) => {
      resolve({
        error: err ? err : "",
        result: err ? "" : "votre profile a été modifié"
      });
    });
  }

  getUser(email, password, resolve) {
    const sql = `select * from ${utilisateurTable.table}
    where ${utilisateurTable.email} = '${email}'
    and ${utilisateurTable.password} = '${password}'`;

    db.query(sql, (err, rows) => {
      resolve({ error: err ? err : "", result: err ? "" : rows[0] });
    });
  }

}

module.exports = new UtilisateurDao();
