const messageFormatter = require("../configureMessage");
const { sendMail } = require("../mailer");
const config = require("config");

const sendMailAfterTest = (name, email) => {
  const message = messageFormatter({
    email,
    subject:
      "Thank you for giving Advanced Data Science Aptitude Test (A-DSAT).",
    text: `Dear ${name},\n

    Thank you giving Advanced Data Science Aptitude Test (A-DSAT).\n
    
    Your results will be shared with you over this registered email very soon.\n
    
    All the best for the results.!!\n\n
    
    Regards \n
    IIT Ropar`,
    html: `<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><div dir="ltr"><div dir="ltr"><div style="box-sizing:border-box;font-family:&quot;Segoe UI&quot;,system-ui,&quot;Apple Color Emoji&quot;,&quot;Segoe UI Emoji&quot;,sans-serif;font-size:14px"><p>Dear ${name},</p><p>Thank you giving Advanced Data Science Aptitude Test (A-DSAT).</p>
    <p>Your results will be shared with you over this registered email very soon.<br></p>
    <p>All the best for the results.!!<br></p>
    <p>Regards<br></p>
    <p>IIT Ropar</p></div></div></div>
    `,
  });
  sendMail(message);
};

module.exports = sendMailAfterTest;
