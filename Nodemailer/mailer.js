const nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");
const path = require("path");
const config = require("config");
const log = require("log-to-file");

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

let transport;

if (config.get("mode") === "production") {
  //Testing Amazon SES
  transport = nodemailer.createTransport({
    host: "email-smtp.us-east-2.amazonaws.com",
    port: 465,
    auth: {
      user: config.get("sesUsername"),
      pass: config.get("sesPassword"),
    },
  });
  console.log("Mongo Running in production mode");
} else {
  transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9263d1380e3424",
      pass: "9963175b71b6f3",
    },
  });
}

const message = {
  from: "ai-course-datascience@iitrpr.ac.in", // Sender address
  to: "pratik1234agarwal@gmail.com,pratik12aga@gmail.com", // List of recipients
  subject: "Welcome to Ikigai Lab", // Subject line
  text: "Hello There Welcome to Ikigai Lab", // Plain text body
};

const sendMail = (message) => {
  //console.log(message);
  return new Promise((resolve, reject) => {
    transport.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};

//sendMail(message);
const location = path.join(
  __dirname,
  "..",
  "template/Registration/registration.html"
);

const locationAttachment = path.join(
  __dirname,
  "..",
  "template/Registration/enrolment.png"
);

const mailSendForRegistration = (email, name) => {
  return new Promise((resolve, reject) => {
    readHTMLFile(location, function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        name,
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: "ai-course-datascience@iitrpr.ac.in",
        to: email,
        subject:
          "Registration Successful- Advance Data Science Aptitude Test (PSDM- IIT Ropar)",
        html: htmlToSend,
        attachments: [
          {
            filename: "enrolment.png",
            path: locationAttachment,
            cid: "banner",
          },
        ],
      };
      transport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(response);
          resolve();
        }
      });
    });
  });
};

const timeSlotMail = (name, email, date, timeSlot) => {
  const locationAttachmentTimeSlot = path.join(
    __dirname,
    "..",
    "template/Timeslot"
  );
  const locationimeSlot = path.join(
    __dirname,
    "..",
    "template/Timeslot/timeslot.html"
  );
  return new Promise((resolve, reject) => {
    readHTMLFile(locationimeSlot, function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        name,
        date,
        timeSlot,
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: "ai-course-datascience@iitrpr.ac.in",
        to: email,
        subject:
          "Advanced Data Science Aptitude Test (A-DSAT) - Exam Date and Time Slot (6th July 2021 and 7th July 2021)",
        html: htmlToSend,
        attachments: [
          {
            filename: "t2.png",
            path: path.join(locationAttachmentTimeSlot, "t2.png"),
            cid: "t2",
          },
          {
            filename: "t3.png",
            path: path.join(locationAttachmentTimeSlot, "t3.png"),
            cid: "t3",
          },
          {
            filename: "t4.png",
            path: path.join(locationAttachmentTimeSlot, "t4.png"),
            cid: "t4",
          },
        ],
      };
      transport.sendMail(mailOptions, function (error, response) {
        if (error) {
          //console.log(error);
          log(`[Error : Mail ${email} , ${name} bounced] `, "timeSlotMail.log");
          reject(error);
        } else {
          //console.log(response);
          log(`[Success : Mail ${email} delivered] `, "timeSlotMail.log");
          resolve();
        }
      });
    });
  });
};

const timeSlotMailGeneral = (name, email, date, timeSlot, dateFormatter) => {
  const locationAttachmentTimeSlot = path.join(
    __dirname,
    "..",
    "template/Timeslot"
  );
  const locationimeSlot = path.join(
    __dirname,
    "..",
    "template/Timeslot/timeslot.html"
  );
  return new Promise((resolve, reject) => {
    readHTMLFile(locationimeSlot, function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        name,
        date,
        timeSlot,
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: "ai-course-datascience@iitrpr.ac.in",
        to: email,
        subject: `Advanced Data Science Aptitude Test (A-DSAT) - Exam Date and Time Slot ( ${dateFormatter} )`,
        html: htmlToSend,
        attachments: [
          {
            filename: "t2.png",
            path: path.join(locationAttachmentTimeSlot, "t2.png"),
            cid: "t2",
          },
          {
            filename: "t3.png",
            path: path.join(locationAttachmentTimeSlot, "t3.png"),
            cid: "t3",
          },
          {
            filename: "t4.png",
            path: path.join(locationAttachmentTimeSlot, "t4.png"),
            cid: "t4",
          },
        ],
      };
      transport.sendMail(mailOptions, function (error, response) {
        if (error) {
          //console.log(error);
          log(`[Error : Mail ${email} , ${name} bounced] `, "timeSlotMail.log");
          reject(error);
        } else {
          //console.log(response);
          log(`[Success : Mail ${email} delivered] `, "timeSlotMail.log");
          resolve();
        }
      });
    });
  });
};

const excelMail = (location, filename, email) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: "ai-course-datascience@iitrpr.ac.in",
      to: email,
      subject: `Excel Data : ${filename}`,
      text: "Please Find the data excel attached",
      attachments: [
        {
          filename: filename,
          path: path.join(location),
        },
      ],
    };

    transport.sendMail(mailOptions, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve();
        console.log("Excel Sent in mail");
      }
    });
  });
};

module.exports = {
  mailSendForRegistration,
  timeSlotMail,
  sendMail,
  timeSlotMailGeneral,
  excelMail,
};
