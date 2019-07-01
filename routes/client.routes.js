const router = require("express").Router();
const clientDao = require("../dao/client.dao");
const { formatTel } = require("../service/fromat");

const { redirectLogin } = require("../middlewares/auth.middleware");

/** Ajout d'un client */
router.get("/ajout", redirectLogin, (req, res) => res.render("client/ajout"));

router.post("/ajout", redirectLogin, (req, res) => {

  const { nomComplet, ville, tel } = req.body;

  clientDao.addClient(nomComplet.trim(), ville.trim(), formatTel(tel.trim()), (resolve) => {
    res.render("client/ajout", { msg: resolve.error || resolve.result });
  });

});


/** modifier d'un client */
router.get("/modifier", redirectLogin, (req, res) => {

  const { c } = req.query;

  clientDao.getClientById(c, (resolve) => {
    res.render("client/modifier", { data: resolve.result });
  });
});

router.post("/modifier", redirectLogin, (req, res) => {

  const { clientid, nomComplet, ville, tel } = req.body;

  clientDao.updateClient(parseInt(clientid), nomComplet.trim(), ville.trim(), formatTel(tel.trim()),
    (resolve) => {
      res.render("client/modifier", { msg: resolve.error || resolve.result });
    });

});



/** supprimer d'un client */
router.get("/supprimer", redirectLogin, (req, res) => {
  const { c } = req.query;

  clientDao.getClientById(c, (resolve) => {
    res.render("client/supprimer", { data: resolve.result });
  });
});

router.post("/supprimer", redirectLogin, (req, res) => {

  const { clientid } = req.body;

  clientDao.deleteClient(parseInt(clientid), (resolve) => {
    res.render("client/supprimer", { msg: resolve.error || resolve.result });
  });

});



/** Get liste des clients */
router.get("/liste", redirectLogin, (req, res) => {

  clientDao.getClients(resolve => {
    res.render("client/clients", { data: resolve.result });
  })

});

module.exports = router;