const messageFormatter = require("../configureMessage");
const { sendMail } = require("../mailer");
const config = require("config");

const sendMailForPasswordReset = (email, token) => {
  console.log(email);
  const url = `https://adsatiitropar.com/api/v1/auth/reset/resetPassword/${token}`;
  const message = messageFormatter({
    email,
    subject: "A-DSAT Password Reset",
    text: "Link to reset you password is " + url,
    html: `<h2> A-DSAT IIT Ropar password reset </h2>
          <div>
              Click <a href="${url}">here</a> to reset you password
              <br/ >
              In case the link is not clickable. Kindly visite this url :${url}
          </div>`,
  });
  console.log("message", message);
  sendMail(message);
};

module.exports = sendMailForPasswordReset;
