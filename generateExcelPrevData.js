const l3students = require("./helpers/l3students");
require("./config/db")();
const xl = require("excel4node");
const wb = new xl.Workbook();
const ws = wb.addWorksheet("Data Sheet");
const { excelMail } = require("./Nodemailer/mailer");
const path = require("path");

//Models
const Test = require("./models/Test");
const Paper = require("./models/Paper");
const User = require("./models/User");

const data = [];
const headingColumnNames = ["Name", "Email", "Phone"];

async function generateData() {
  try {
    const tests = await Test.find();
    console.log(l3students.length);
    for (let i = 0; i < l3students.length; i++) {
      const user = await User.findOne({ email: l3students[i] });
      if (!user) {
        console.log("User not present in the database");
      }
      if (i % 50 == 0) {
        console.log(i);
      }
      const dd = {};
      dd["Name"] = user.name;
      dd["Email"] = user.email;
      dd["Phone"] = user.phone;

      for (let j = 0; j < tests.length; j++) {
        const paper = await Paper.findOne({
          user: user._id,
          test: tests[j]._id,
        });
        if (!paper) {
          dd[tests[j].testName] = "Not Attempted";
        } else {
          dd[tests[j].testName] = `${paper.marks}`;
        }
      }

      data.push(dd);
    }
    console.log("Data Length: ", data.length);
    for (let i = 0; i < tests.length; i++) {
      headingColumnNames.push(tests[i].testName);
    }
  } catch (err) {
    console.log(err);
  }
}

function generateExcel() {
  //Write Column Title in Excel file
  let headingColumnIndex = 1;
  headingColumnNames.forEach((heading) => {
    ws.cell(1, headingColumnIndex++).string(heading);
  });

  // Writing data in Excel.
  let rowIndex = 2;
  data.forEach((record) => {
    let columnIndex = 1;
    Object.keys(record).forEach((columnName) => {
      ws.cell(rowIndex, columnIndex++).string(record[columnName]);
    });
    rowIndex++;
  });
  wb.write("L3StudentsData.xlsx");

  console.log("Excel Generated");
}

async function sendMail() {
  try {
    const location = path.join(__dirname, "L3StudentsData.xlsx");
    await excelMail(
      location,
      "L3StudentsData.xlsx",
      "pratik.agarwal@theikigailab.com"
    );
    await excelMail(
      location,
      "L3StudentsData.xlsx",
      "abhay.pandey@theikigailab.com"
    );
    console.log("Mail Sent, Exit Program");
  } catch (err) {
    console.log(err);
  }
}

async function doeverything() {
  console.log("aa");
  await generateData();
  generateExcel();
  //await sendMail();
}

setTimeout(doeverything, 1000);
