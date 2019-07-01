const router = require("express").Router();
const { redirectHome } = require("../middlewares/auth.middleware");
const userDao = require("../dao/utilisateur.dao");

router.get("/login", redirectHome, (req, res) => {
  res.render("login")
});

router.post("/login", redirectHome, (req, res) => {
  const { email, password } = req.body;

  userDao.getUser(email, password, (resolve) => {

    if (!resolve.error && resolve.result) {
      req.session.userInfo = resolve.result;
      res.locals.userInfo = req.session.userInfo;

      res.redirect("/");
    }
    else {
      res.render("login", { msg: "utilisateur n'existe pas!" });
    }
  })
});



router.get("/logout", (req, res) => {
  req.session.destroy();
  req.session = null;
  req.locals = null;
  res.redirect("/");
});

module.exports = router;
