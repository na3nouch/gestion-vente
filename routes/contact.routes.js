const router = require('express').Router();
const nodemailer = require('nodemailer');

const { redirectLogin } = require("../middlewares/auth.middleware");

const userEmail = "ecprnaanouch@zoho.com";
const pass = "@m1a2h3e4r5";

/* GET contact page. */
router.get('/', redirectLogin, (req, res) => res.render('contact', { data: userEmail }));


router.post('/', redirectLogin, (req, res) => {

  const { email, emailDest, sujet, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'zoho',
    host: 'smtp.zoho.com',
    port: 465,
    secure: false,
    auth: { user: email.trim(), pass }
  });

  let mailOptions = {
    from: email.trim(), to: emailDest.trim(), subject: sujet.trim(), text: message.trim()
  };

  transporter.sendMail(mailOptions, function (error, info) {

    res.render('contact',
      { msg: error ? error : "un email a été bien envoyé", data: userEmail });

  });


});

module.exports = router;
