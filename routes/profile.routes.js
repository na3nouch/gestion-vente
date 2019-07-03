const router = require('express').Router();
const userDao = require("../dao/utilisateur.dao");

const { redirectLogin } = require("../middlewares/auth.middleware");

router.get('/', redirectLogin, (req, res) => {
  if (req.session.userInfo || res.locals.userInfo) {
    const user = req.session.userInfo || res.locals.userInfo;
    res.render('profile', { data: user });
  }
});

// update profile
router.post('/', redirectLogin, (req, res) => {
  if (req.session.userInfo || res.locals.userInfo) {
    const user = req.session.userInfo || res.locals.userInfo;
    const { utilisateur_id } = req.session.userInfo || res.locals.userInfo;
    const { nomcomplet, email, password } = req.body;

    userDao.updateUser(utilisateur_id, nomcomplet, email, password, (resolve) => {
      res.render('profile', {
        msg: resolve.error || resolve.result, data: user
      });
    })
  }
});

// render avatar profile
router.get('/avatar', redirectLogin, (req, res) => {
    res.render('profile', { data: user });
});


router.post('/avatar', redirectLogin, (req, res) => {

  console.log(req.files.avatar)

  if (req.session.userInfo || res.locals.userInfo) {
    const user = req.session.userInfo || res.locals.userInfo;
    res.render('profile', { data: user });
  }
});

module.exports = router;
