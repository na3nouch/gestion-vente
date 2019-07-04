const router = require("express").Router();
const clientDao = require("../dao/client.dao");
const venteDao = require("../dao/vente.dao");

const { redirectLogin } = require("../middlewares/auth.middleware");

/** Ajout vente */
router.get("/ajout", redirectLogin, (req, res) => {
  clientDao.getClients(resolve => {
    res.render("vente/ajout", { clients: resolve.result });
  })
});

router.post("/ajout", redirectLogin, (req, res) => {
  const { libelle, reference, quantite, prixUnitaire, total, dateVente, client } = req.body;

  venteDao.addVente(
    libelle, reference, parseInt(quantite),
    prixUnitaire, total, dateVente, parseInt(client),
    (resolve) => {
      res.render("vente/ajout", { msg: resolve.error || resolve.result });
    });
});



/** modifier vente */
router.get("/modifier", redirectLogin, (req, res) => {
  const { c } = req.query;

  venteDao.getVenteById(c, resolve => {
    clientDao.getClients(reslv => {
      res.render("vente/modifier", { data: resolve.result, clients: reslv.result });
    })
  });
});

router.post("/modifier", redirectLogin, (req, res) => {
  const { venteId, libelle, reference, quantite, prixUnitaire, total, dateVente, client } = req.body;
  venteDao.updateVente(
    parseInt(venteId), libelle, reference, parseInt(quantite), prixUnitaire, total, dateVente, client,
    resolve => {
      res.render("vente/modifier", { msg: resolve.error || resolve.result });
    });
});



/** supprimer vente */
router.get("/supprimer", redirectLogin, (req, res) => {
  const { c } = req.query;

  venteDao.getVenteById(c, resolve => {
    clientDao.getClients(reslv => {
      res.render("vente/supprimer", { data: resolve.result, clients: reslv.result });
    })
  });
});

router.post("/supprimer", redirectLogin, (req, res) => {
  const { venteId } = req.body;
  venteDao.deleteVente(parseInt(venteId), resolve => {
    res.render("vente/supprimer", { msg: resolve.error || resolve.result });
  });
});




/** liste des ventes */
router.get("/liste", redirectLogin, (req, res) => {
  venteDao.getVentes(resolve => {
    res.render("vente/ventes", { data: resolve.result });
  });
});

router.get("/liste-ventes", (req, res) => {
  venteDao.getVentes((resolve) => {
    res.status(200).json(resolve.result)
  });
});

module.exports = router;