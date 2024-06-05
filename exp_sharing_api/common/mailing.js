let mailOptions = {
    from: 'explitapp@gmail.com',
    to: 'anuarkhan@gmail.com',
    subject: 'Nodemailer Project',
    text: 'Hi from your nodemailer project #2'
  };
  
  const sendEmail = transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });


