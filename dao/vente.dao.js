const db = require("../database/connection.db");

const venteTable = {
  table: "ventes",
  venteId: "vente_id",
  libelle: "libelle",
  reference: "reference",
  quantite: "quantite",
  prixUnitaire: "prix_unitaire",
  total: "total",
  dateVente: "date_vente",
  idClient: "id_client"
};

class VenteDao {

  addVente(libelle, reference, quantite, prixUnitaire, total, dateVente, idClient, resolve) {

    const sql = `INSERT INTO ${venteTable.table} 
    (
      ${venteTable.libelle}, 
      ${venteTable.reference}, 
      ${venteTable.quantite}, 
      ${venteTable.prixUnitaire}, 
      ${venteTable.total}, 
      ${venteTable.dateVente}, 
      ${venteTable.idClient}
    ) 
    VALUES (
      '${libelle}', 
      '${reference}', 
      ${quantite}, 
      '${prixUnitaire}', 
      '${total}', 
      '${dateVente}', 
      ${idClient}
    ) `;

    db.query(sql, (err, rows) => {
      resolve({
        error: err ? err : "",
        result: err ? "" : "une vente a été bien insérée"
      });
    });
  }

  /** Sill */
  updateVente(venteId, libelle, reference, quantite, prixUnitaire, total, dateVente, idClient, resolve) {

    const sql = `update ${venteTable.table} set 
    ${venteTable.libelle} = '${libelle}', 
    ${venteTable.reference} = '${reference}', 
    ${venteTable.quantite} = ${quantite},
    ${venteTable.prixUnitaire} = '${prixUnitaire}',
    ${venteTable.total} = '${total}',
    ${venteTable.dateVente} = '${dateVente}',    
    ${venteTable.idClient} = ${idClient}
    where ${venteTable.venteId} = ${venteId}
    `;

    db.query(sql, (err, rows) => {
      resolve({
        error: err ? err : "",
        result: err ? "" : "une vente a été bien modifiée"
      });
    });
  }

  deleteVente(venteId, resolve) {

    const sql = `delete from ${venteTable.table}
    where ${venteTable.venteId} = ${venteId}`;

    db.query(sql, (err, rows) => {
      resolve({
        error: err ? err : "",
        result: err ? "" : "une vente a été bien supprimée"
      });
    });
  }

  getVenteById(venteId, resolve) {

    const sql = `select * from ${venteTable.table} v 
    join clients c on v.id_client = c.client_id
    where ${venteTable.venteId} = ${venteId}`;

    db.query(sql, (err, rows) => {
      resolve({ error: err ? err : "", result: err ? "" : rows[0] });
    });
  }

  getVentes(resolve) {
    const sql = `select * from ${venteTable.table} v 
    join clients c on v.id_client = c.client_id`;
    db.query(sql, (err, rows) => {
      resolve({ error: err ? err : "", result: err ? "" : rows });
    });
  }
}


module.exports = new VenteDao();
