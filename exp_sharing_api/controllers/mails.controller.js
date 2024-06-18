const nodeMailer = require('nodemailer');
require('dotenv').config();

const {getById} = require ('../models/user.model')
const { EMAIL_TEMPLATES } = require ('../common/db/emailTemplates.db')

//Transporter para nodemailer con OAuth2
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
});


/**
 * Sends emails to a list of recipients with personalized content.
 *
 * @param {string[]} req.body.bcc - An array of recipient user IDs.
 * @param {string} req.body.subject - Subject of the email.
 * @param {string} req.body.selectedTemplate - The selected email template to be used (key value in file ../common/db/emailTemplates.db.js).
 * @returns {Promise<void>} - A promise that resolves when the emails have been sent.
 */
const sendMail = async (req, res) => {

  const { bcc, html, selectedTemplate, groupName = null, balance = null } = req.body
  let template = EMAIL_TEMPLATES[selectedTemplate]
  const { name } = req.user

  // Para cada destinatario elabora el texto y envia el email
  let responses = await Promise.all(
    bcc.map(async userId => {
      // Recoge los datos de usuario y destinatarios y personaliza los mensajes
      const [[recipient]] = await getById(userId)

      // Busca el valor del saldo del usuario en el array
      let userBalance
      for (const data of balance) {
        if (data.user_id === userId)
          userBalance  = data.credit.toFixed(2)

      }

      // Crea un template personalizado remplazando los placeholders por sus valores
      const placeholders = {
        $name : name,
        $friendsName: recipient.firstname,
        $grupName: groupName,
        $balance: userBalance
      };
      
      const personalizedTemplate = replacePlaceholders(template, placeholders);

      const currentHtml = (html) ? html : personalizedTemplate.html

      const mailOptions = {
        from: 'explitapp@gmail.com',
        bcc: recipient.mail,
        subject: personalizedTemplate.subject,
        html: currentHtml,
      };
      const response = await emailHandler(mailOptions)
      // Almacena las respuestas en un array de objetos
      let responseObj = {}
      responseObj [recipient.firstname] = response
      return responseObj
      })
      )
    res.json (responses)
}


/**
 * Replaces placeholders in the template with the corresponding values.
 *
 * @param {Object} template - The template object containing subject and html strings.
 * @param {string} template.subject - The subject string with placeholders.
 * @param {string} template.html - The HTML string with placeholders.
 * @param {Object} placeholders - An object where keys are placeholders and values are the replacement strings.
 * @returns {Object} - The updated template with placeholders replaced.
 */
const replacePlaceholders = (template, placeholders) => {
  let updatedTemplate = { ...template };
  for (const [key, value] of Object.entries(placeholders)) {
    const regex = new RegExp(`\\${key}`, 'g');
    updatedTemplate.subject = updatedTemplate.subject.replace(regex, value);
    updatedTemplate.html = updatedTemplate.html.replace(regex, value);
  }
  return updatedTemplate;
};

/**
 * Sends an email using the provided mail options.
 *
 * @param {Object} mailOptions - The mail options object.
 * @param {string} mailOptions.from - The sender's email address.
 * @param {string} mailOptions.bcc - The recipient's email address.
 * @param {string} mailOptions.subject - The subject of the email.
 * @param {string} mailOptions.html - The HTML content of the email.
 * @returns {Promise<Object>} - A promise that resolves to an object indicating success or failure.
 */
async function emailHandler(mailOptions) {
  try {
    const response = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

module.exports = { sendMail };