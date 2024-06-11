const nodeMailer = require('nodemailer');

//Transporter para nodemailer con OAuth2
const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
});
  
  
// Creacion nuevo email
const sendMail = (req, res) => {
      const mailOptions = {
          from: 'explitapp@gmail.com',
          to: 'explitapp@gmail.com',
          subject: 'Explit email subject',
          html : 'Hi from your nodemailer project #2'
      };
      mailOptions.to = req.body.to;
      mailOptions.subject = req.body.subject;
      mailOptions.html = req.body.html;
  
      try {
          transporter.sendMail(mailOptions, function(err, data) {
              if (err) {
                console.log("Error " + err);
                return res.send("Error " + err)
              } else {
                console.log("Email sent successfully");
                return res.json ({success: true})
              }
          });
      } catch (error) {
          return res.json({
              success: false,
              error: error
          })
  }
};
  
module.exports = { sendMail };