const router = require('express').Router();

const { redirectLogin } = require("../middlewares/auth.middleware");

/* GET home page. */
router.get('/', redirectLogin, (req, res) => {
  res.render('index');
});

module.exports = router;
