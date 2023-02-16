const router = require("express").Router();
const {
  failErrorResponse,
  serverErrorResponse,
} = require("../../helpers/responseHandles");
const User = require("../../models/User");
const Questions = require("../../models/Questions");
const Paper = require("../../models/Paper");
const auth = require("../../middleware/auth");
const TimeSlot = require("../../models/timeSlot");
const config = require("config");
const { check, validationResult } = require("express-validator");
const scheduleSubmit = require("../../helpers/scheduleSubmit");
const sendMailAfterTest = require("../../Nodemailer/mailTemplates/mailSendAfterTest");

const fetchQuestionAndPopulate = async (category) => {
  let totalQuestions = [];
  for (let i = 0; i < category.length; i++) {
    //console.log(category[i]);
    const questions = await Questions.aggregate([
      { $match: { category: category[i] } },
      { $sample: { size: 5 } },
    ]);
    //console.log("questions", questions);
    totalQuestions.push(...questions);
  }
  return totalQuestions;
};

function checkSlotDetails(d1, d2) {
  const date = Date.now();
  if (date > d1.getTime() && date < d2.getTime()) {
    return true;
  } else {
    return false;
  }
}

// Route to check if user's slot is there or not.
router.get("/checkSlot", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.slotAlloted) {
      return res.json({
        status: "success",
        data: {
          slotAlloted: false,
        },
      });
    }
    const slot = await TimeSlot.findById(user.timeSlot).select(
      "startTime endTime"
    );
    const d1 = new Date(slot.startTime);
    const d2 = new Date(slot.endTime);

    if (checkSlotDetails(d1, d2)) {
      return res.json({
        status: "success",
        data: {
          slotAlloted: true,
          isSlotTime: true,
        },
      });
    } else {
      return res.json({
        status: "success",
        data: {
          slotAlloted: true,
          isSlotTime: false,
          slot,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

// TODO: Check if the test has been finished
router.get("/questionPaper", auth, async (req, res) => {
  try {
    let paper = await Paper.findOne({ user: req.user.id });
    if (paper) {
      return res.json({
        status: "success",
        data: { paper },
      });
    }
    const questions = await fetchQuestionAndPopulate([
      "Integrated Reasoning",
      "Statistics and Probability",
      "Quantitative Aptitude",
      "Data Interpretation",
      "Business Understanding",
    ]);

    //console.log(questions);
    paper = new Paper({
      questions: questions.map((que) => ({
        questionId: que._id,
        questionText: que.text,
        questionImage: que.questionImage,
        A: { ...que.A },
        B: { ...que.B },
        C: { ...que.C },
        D: { ...que.D },
        category: que.category,
      })),
      user: req.user.id,
    });
    const user = await User.findById(req.user.id).select("name email");
    await paper.save();
    scheduleSubmit(paper, user, config.get("DsatTimeinMinutes") * 60 * 1000);
    res.json({
      status: "success",
      data: {
        paper,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

// TODO: Add checks for the body parameters
router.post("/answer", auth, async (req, res) => {
  try {
    const questionPaper = await Paper.findOne({ user: req.user.id });
    if (questionPaper.finished) {
      return res
        .status(401)
        .json(failErrorResponse("You have already submitted the test"));
    }
    if (!questionPaper) {
      return res
        .status(401)
        .json(failErrorResponse("The user has not yet started a attempt"));
    }
    const testStartedAt = new Date(questionPaper.startedAt).getTime();
    const timeElapsed = Date.now() - testStartedAt;
    if (timeElapsed > config.get("DsatTimeinMinutes") * 60 * 1000) {
      return res
        .status(401)
        .json(failErrorResponse("Time Limit for the test has elapsed"));
    }

    await Paper.updateOne(
      { user: req.user.id },
      {
        $set: {
          "questions.$[updateQuestion].answer": req.body.answer,
          "questions.$[updateQuestion].status": "answered",
        },
      },
      {
        arrayFilters: [{ "updateQuestion.questionId": req.body.questionId }],
      }
    );

    res.json({ status: "success", message: "Answer marked" });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get("/submit/test", auth, async (req, res) => {
  try {
    const questionPaper = await Paper.findOne({ user: req.user.id });
    const user = await User.findById(req.user.id);
    if (questionPaper.finished) {
      return res
        .status(400)
        .json(failErrorResponse("Test Has Already Been Submitted"));
    }
    if (!questionPaper) {
      return res
        .status(401)
        .json(failErrorResponse("The user has not started any attempt"));
    }
    questionPaper.finished = true;
    questionPaper.finishedAt = Date.now();
    await questionPaper.save();
    sendMailAfterTest(user.name, user.email);
    return res.json({
      status: "success",
      data: { message: "Test Successfully saved" },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get("/test", auth, async (req, res) => {
  const questionPaper = await Paper.findOne({ user: req.user.id });
  res.json(questionPaper);
  const date = new Date(questionPaper.startedAt);
  console.log(date.getTime());
  const diff = Date.now() - date.getTime();
  console.log(diff);
  console.log(diff / 1000);
  const minutes = diff / 60000;
  console.log(minutes);
  console.log(date);
  //res.send("hefad");
});

module.exports = router;
