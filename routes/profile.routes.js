const router = require('express').Router();
const userDao = require("../dao/utilisateur.dao");
const fileDao = require("../dao/file.dao");
const multer = require("multer");
var upload = multer()

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


router.post('/avatar', [redirectLogin, upload.single("avatar")], (req, res) => {

  if (req.session.userInfo || res.locals.userInfo) {
    const user = req.session.userInfo || res.locals.userInfo;
    const { utilisateur_id } = user;

    let fileName = req.file.originalname;
    let type = req.file.mimetype;
    let base64data = (req.file.buffer).toString('base64');

    let avatar = `data:${type};base64,${base64data}`;

    fileDao.updateFile(fileName, base64data, type, utilisateur_id, (resolve) => {
      res.render('profile', {
        data: user, msg: resolve.error || resolve.result,
        avatar
      });
    })
  }
});

module.exports = router;
