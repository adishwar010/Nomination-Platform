const messageFormatter = require("../configureMessage");
const { mailSendForRegistration } = require("../mailer");
const config = require("config");

const sendMailAfterRegistration = async (email, name) => {
  await mailSendForRegistration(email, name);
};

module.exports = sendMailAfterRegistration;
