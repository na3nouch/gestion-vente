const db = require("../database/connection.db");

const filesTable = {
  table: "files",
  fileName: "file_name",
  file: "file",
  type: "type",
  idUtilisateur: "id_utilisateur"
}

class FilesDao {

  addFile(fileName, file, type, idUtilisateur, resolve) {

    const sql = `INSERT INTO ${filesTable.table} 
    (${filesTable.fileName}, 
      ${filesTable.file}, 
      ${filesTable.type},
      ${filesTable.idUtilisateur} 
      ) 
    VALUES ('${fileName}', '${file}', '${type}', ${idUtilisateur}) `;

    db.query(sql, (err, rows) => {
      resolve({
        error: err ? err : "",
        result: err ? "" : "un fichier a été bien inséré"
      });
    });
  }

  updateFile(fileName, file, type, idUtilisateur, resolve) {

    const sql = `update ${filesTable.table} set 
    ${filesTable.fileName} = '${fileName}', 
    ${filesTable.file} = '${file}', 
    ${filesTable.type} = '${type}'
    where ${filesTable.idUtilisateur} = ${idUtilisateur}
    `;

    db.query(sql, (err, rows) => {
      resolve({
        error: err ? err : "",
        result: err ? "" : "votre image été bien modifiée"
      });
    });
  }


  getFileById(idUtilisateur, resolve) {

    const sql = `select * from ${filesTable.table}
    where ${filesTable.idUtilisateur} = ${idUtilisateur}`;

    db.query(sql, (err, rows) => {
      resolve({ error: err ? err : "", result: err ? "" : rows[0] });
    });
  }


}


module.exports = new FilesDao();
