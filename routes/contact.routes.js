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
      host: 'smtp.zoho.com',
      port: 465,
      secure: false,
      auth: { user: email.trim(), pass: 'WxC 0123$^p' }
    });

    let mailOptions = {
      from: email.trim(), to: emailDest.trim(), subject: sujet.trim(), text: message.trim()
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.render('contact', { msg: error, data: user });
      } else {
        res.render('contact', { msg: "un email a été bien envoyé", data: user });
      }
    });

  }
});

module.exports = router;
