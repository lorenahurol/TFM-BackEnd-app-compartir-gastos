const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Bienvenido a bordo $name!',
    html: '<p>Hola $name,</p><p>Bienvenido a <b>ExplitApp</b> tu fiel aliado para repartir gastos de foma rápida y sencilla. Entra ya a <a href="http://localhost:4200/landing">ExplitApp</a>',
  },
  invitation: {
    subject: 'Tu amigo $name te invita a Explitapp',
    html: '<p>Hola $friendsName,</p> <p>tu amigo $name te ha invitado a unirte a su grupo en ExplitApp. Únete a él aceptando su invitación <a href="http://localhost:4200/landing">invitación</a></p>',
  },
  passwordRecovery: {
    subject: '',
    html: '',
  },
};

module.exports = {
  EMAIL_TEMPLATES
}