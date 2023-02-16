const router = require("express").Router();
const auth = require("../../middleware/authAdmin");

const l3students = require("../../helpers/l3students");

const {
  failErrorResponse,
  serverErrorResponse,
} = require("../../helpers/responseHandles");

const Paper = require("../../models/Paper");
const User = require("../../models/User");
const Event = require("../../models/Event");
const Subtopic = require("../../models/SubTopic");
const Test = require("../../models/Test");

const users = require("../../helpers/emailArray");

router.get("/testNotGiven/:testId", auth, async (req, res) => {
  try {
    let data = [];
    const id = req.params.testId;
    for (let i = 0; i < users.length; i++) {
      const user = await User.findOne({ email: users[i] });
      if (!user || !l3students.includes(user.email)) {
        continue;
      }
      const paper = await Paper.findOne({ test: id, user: user._id });
      if (!paper) {
        data.push({
          name: user.name,
          email: user.email,
          phone: user.phone,
        });
      }
    }

    return res.json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

router.get("/testAllDetails", auth, async (req, res) => {
  try {
    let data = [];
    const tests = await Test.find().select("testName");
    console.log(tests[0]);
    // for (let i = 0; i < users.length; i++) {
    //   const user = await User.findOne({ email: users[i] });
    //   if (!user) continue;
    //   let temp = {
    //     name: user.name,
    //     email: user.email,
    //     phone: user.phone,
    //     batch: `batch ${user.batch}`,
    //   };

    //   for (let j = 0; j < tests.length; j++) {
    //     const paper = await Paper.findOne({
    //       user: user._id,
    //       test: tests[j]._id,
    //     }).select('marks');
    //     if (paper) {
    //       temp[tests[j].testName] = 'Given';
    //     } else {
    //       temp[tests[j].testName] = 'Not Given';
    //     }
    //   }
    //   data.push(temp);
    // }

    for (let k = 1; k <= 4; k++) {
      const usersBatch = await User.find({ batch: k });
      for (let i = 0; i < usersBatch.length; i++) {
        const user = usersBatch[i];
        let temp = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          batch: `batch ${k}`,
        };
        for (let j = 0; j < tests.length; j++) {
          const paper = await Paper.findOne({
            user: user._id,
            test: tests[j]._id,
          }).select("marks");
          if (paper) {
            temp[tests[j].testName] = "Given";
          } else {
            temp[tests[j].testName] = "Not Given";
          }
        }
        data.push(temp);
      }
    }
    return res.json({
      status: "success",
      data: {
        data,
        length: data.length,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
