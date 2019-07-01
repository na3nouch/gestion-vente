const router = require('express').Router();
const userDao = require("../dao/utilisateur.dao");

const { redirectLogin } = require("../middlewares/auth.middleware");

/* GET home page. */
router.get('/', redirectLogin, (req, res) => {
  res.render('index');
});


router.get('/profile', redirectLogin, (req, res) => {
  if (req.session.userInfo || res.locals.userInfo) {
    const user = req.session.userInfo || res.locals.userInfo;
    res.render('profile', { data: user });
  }
});

router.post('/profile', redirectLogin, (req, res) => {
  if (req.session.userInfo || res.locals.userInfo) {
    const { utilisateur_id } = req.session.userInfo || res.locals.userInfo;
    const { nomcomplet, email, password } = req.body;

    userDao.updateUser(utilisateur_id, nomcomplet, email, password, (resolve) => {
      res.render('profile', { msg: resolve.error || resolve.result });
    })
  }
});

module.exports = router;
