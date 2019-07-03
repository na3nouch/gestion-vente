const router = require('express').Router();
const fileDao = require("../dao/file.dao");

const { redirectLogin } = require("../middlewares/auth.middleware");

/* GET home page. */
router.get('/', redirectLogin, (req, res) => {
  if (req.session.userInfo || res.locals.userInfo) {
    const user = req.session.userInfo || res.locals.userInfo;
    const { utilisateur_id } = user;

    fileDao.getFileById(utilisateur_id, (resolve) => {

      const { file, type } = resolve.result;

      let avatar = `data:${type};base64,${file}`;
      req.session.avatar = avatar;

      res.render('index');
    });
  }
});

module.exports = router;
