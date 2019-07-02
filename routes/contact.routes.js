const router = require('express').Router();
const nodemailer = require('nodemailer');

const { redirectLogin } = require("../middlewares/auth.middleware");

/* GET contact page. */
router.get('/', redirectLogin, (req, res) => {
  if (req.session.userInfo || res.locals.userInfo) {
    const user = req.session.userInfo || res.locals.userInfo;
    res.render('contact', { data: user });
  }
});


router.post('/', redirectLogin, (req, res) => {
  if (req.session.userInfo || res.locals.userInfo) {

    const user = req.session.userInfo || res.locals.userInfo;
    const { email, emailDest, sujet, message } = req.body;

    // haikel.fazzanii@outlook.fr
    let transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: { user: email, pass: 'WxC 0123$^p' }
    });

    let mailOptions = {
      from: email, to: emailDest.trim(), subject: sujet.trim(), text: message.trim()
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.render('contact', { msg: "erreur d'envoie, merci d'essayer plus tard!", data: user });
      } else {
        res.render('contact', { msg: "un email a été bien envoyé", data: user });
      }
    });

  }
});

module.exports = router;
