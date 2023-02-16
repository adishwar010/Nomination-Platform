const Paper = require("../models/Paper");
const sendMailAfterTest = require("../Nodemailer/mailTemplates/mailSendAfterTest");

function scheduleSubmit(id, user, time) {
  setTimeout(async () => {
    await Paper.updateOne({ id }, { finished: true, finishedAt: new Date() });
    sendMailAfterTest(user.name, user.email);
  }, time);
}

module.exports = scheduleSubmit;
