const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Bienvenido a bordo $name!',
    html: '<p><span style="font-family: Verdana; font-size: 14px;">Hola </span><strong style="font-family: Verdana; font-size: 14px;">$name</strong><span style="font-family: Verdana; font-size: 14px;">,</span></p><p><br></p><p><span style="font-family: Verdana; font-size: 14px;">¡El equipo de </span><strong style="font-family: Verdana; font-size: 14px;">ExplitApp </strong><span style="font-family: Verdana; font-size: 14px;">te da la bienvenida!</span></p><p><br></p><p><strong style="font-family: Verdana; font-size: 14px;"><em>ExplitApp </em></strong><span style="font-family: Verdana; font-size: 14px;">es tu fiel aliado para repartir gastos de foma rápida y sencilla. </span></p><p><br></p><p><span style="font-family: Verdana; font-size: 14px;">¡Entra ya a</span><strong style="font-family: Verdana; font-size: 14px;"><em> </em></strong><a href="http://localhost:4200/landing" target="_blank" style="font-family: Verdana; font-size: 14px;"><strong><em>ExplitApp.es</em></strong></a><span style="font-family: Verdana; font-size: 14px;"> ye empieza a compartir!</span></p>',
  },
  invitation: {
    subject: '$friendsName, tu amigo $name te invita a unirte a un grupo de Explitapp',
    html: '<p><span style="font-family: Verdana; font-size: 14px;">Hola </span><strong style="font-family: Verdana; font-size: 14px;">$friendsName</strong><span style="font-family: Verdana; font-size: 14px;">,</span></p><p><br></p><p><span style="font-family: Verdana; font-size: 14px;"> tu amigo </span><strong style="font-family: Verdana; font-size: 14px;">$name</strong>    <span style="font-family: Verdana; font-size: 14px;"> te ha invitado a unirte a un grupo en </span>    <strong style="font-family: Verdana; font-size: 14px;">ExplitApp</strong><span style="font-family: Verdana; font-size: 14px;">. </span></p><p><br></p><p>    <span style="font-family: Verdana; font-size: 14px;"> Este es su mensaje: </span></p><p>    <span style="font-family: Verdana; font-size: 14px;"> $html</span></p><p><br></p><p>    <span style="font-family: Verdana; font-size: 14px;">Entra en la web y únete a él aceptando su </span>    <a href="http://localhost:4200/login" target="_blank" style="font-family: Verdana; font-size: 14px;"><strong><em>invitación</em></strong></a></p><p><br></p><p>    <span style="font-family: Verdana; font-size: 14px;">¡</span><em style="font-family: Verdana; font-size: 14px;">TE ESPERAMOS</em>    <span style="font-family: Verdana; font-size: 14px;">!</span></p><p><br></p><p>    <span style="font-family: Verdana; font-size: 14px;">El equipo de </span><strong style="font-family: Verdana; font-size: 14px;">ExplitApp</strong></p>v',
  },
  passwordRecovery: {
    subject: '',
    html: '',
  },
  unsubscribe: {
    subject: '¡Que pena verte marchar $name!',
    html: '<p><span style="font-family: Verdana;">Hola </span><strong style="font-family: Verdana;">$name</strong><span style="font-family: Verdana;">,</span></p><p><br></p><p><span style="font-family: Verdana;">¡</span><em style="font-family: Verdana;">¡Estamos muy tristes por verte marchar! </em><span style="font-family: Verdana;">! </span></p><p><br></p><p><span style="font-family: Verdana;">Igualmente agradecemos la confianza que has depositado en nuestra app y esperamos verte pronto de vuelta.</span></p><p><br></p><p><span style="font-family: Verdana;">¡Ya sabes </span><a href="http://localhost:4200/landing" target="_blank" style="font-family: Verdana;">adonde encontrarnos</a><span style="font-family: Verdana;">!</span></p><p><br></p><p><span style="font-family: Verdana;">El equipo de </span><strong style="font-family: Verdana;">Explitapp</strong></p>',
  },
  settleExpenses: {
    subject: "Hola $friendsName, es hora de saldar cuentas",
    html: '<p><span style="font-family: verdana, geneva;">Hola <em><strong>$friendsName</strong></em>:</span></p><p><span style="font-family: verdana, geneva;">&nbsp;</span></p><p><span style="font-family: verdana, geneva;">Ha llegado la hora de saldar las cuentas del grupo <span style="font-family: verdana, geneva;"><strong>$grupName</strong></span>.</span></p><p><span style="font-family: verdana, geneva;">Nuestros incre&iacute;bles algoritmos nos dicen que tu saldo es de:</span></p><p><strong><span style="font-family: verdana, geneva;">$balance &euro;</span></strong><span style="font-family: verdana, geneva;">.</span></p><p>&nbsp;</p><p>&iexcl;Gracias por seguir compartiendo con <a href="http://localhost:4200/landing">ExplitApp</a>!</p>'
  }
};

module.exports = {
  EMAIL_TEMPLATES
}