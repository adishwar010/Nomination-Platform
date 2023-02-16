const router = require("express").Router();
const User = require("../../models/User");
const Questions = require("../../models/Questions");
const Admin = require("../../models/Admin");
const Paper = require("../../models/Paper");
const Result = require("../../models/Result");
const Test = require("../../models/Test");
const auth = require("../../middleware/authAdmin");

const {
  serverErrorResponse,
  failErrorResponse,
} = require("../../helpers/responseHandles");
const { json } = require("body-parser");

router.get("/:testId", auth, async (req, res) => {
  try {
    const id = req.params.testId;
    const test = await Test.findById(id).populate({ path: "questionBank" });
    const papers = await Paper.find({ test: id }).populate({
      path: "user",
      select: "name email batch",
    });
    console.log(papers);
    // Filter the paper based on the time they have finished upon.
    for (let i = 0; i < papers.length; i++) {
      const metric = generateResult(papers[i], test.questionBank);
      console.log(metric);
      metric.marks =
        metric.correct * test.marksPerQuestions +
        metric.incorrect * test.negativeMarksPerQuestion;
      console.log(metric);
      await Paper.updateOne(
        { _id: papers[i]._id },
        {
          ...metric,
        }
      );
      //papers[i] = { ...papers[i], ...metric };
      papers[i].attempted = metric.attempted;
      papers[i].marks = metric.marks;
      papers[i].correct = metric.correct;
      papers[i].incorrect = metric.incorrect;
    }
    res.json({
      status: "success",
      data: {
        papers,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

function generateResult(paper, questionBank) {
  let metrics = {
    correct: 0,
    incorrect: 0,
    attempted: paper.responses.length,
    marks: 0,
  };
  for (let i = 0; i < paper.responses.length; i++) {
    const response = paper.responses[i];
    let question = {};
    for (let j = 0; j < questionBank.length; j++) {
      if (questionBank[j]._id.toString() === response.questionId.toString()) {
        question = questionBank[j];
      }
    }
    if (question.answer === response.answer) {
      metrics.correct += 1;
    } else {
      metrics.incorrect += 1;
    }
  }
  return metrics;
}

module.exports = router;
