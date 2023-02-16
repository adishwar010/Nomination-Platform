const router = require("express").Router();
const User = require("../../models/User");
const Paper = require("../../models/Paper");
const Test = require("../../models/Test");
const Question = require("../../models/Questions");

const auth = require("../../middleware/auth");
const {
  failErrorResponse,
  serverErrorResponse,
} = require("../../helpers/responseHandles");

// TODO:
// 1. Check for test result evaluation before generating report, if not call that
// 2.
router.get("/:testId", auth, async (req, res) => {
  try {
    const testId = req.params.testId;
    console.log(testId);

    const papers = await Paper.find({ test: testId })
      .populate("user")
      .select("marks user responses");

    console.log(papers);

    let classAvg = calculateClassAvg(papers);

    const paperStudent = await Paper.findOne({ user: req.user.id });

    let topicWise = await calculateTopicWise(paperStudent.responses);
    console.log(topicWise);
    console.log(calculateTopicWise(papers[0].responses));

    res.json({
      status: "success",
      data: {
        classAverage: classAvg,
        topicWise: topicWise,
        marks: paperStudent.marks,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

function calculateClassAvg(papers) {
  let l = papers.length;
  let total = 0;
  for (let i = 0; i < l; i++) {
    total += papers[i].marks;
  }

  return total / l;
}

async function calculateTopicWise(responses) {
  let l = responses.length;
  let topics = {};
  for (let i = 0; i < l; i++) {
    let r = responses[i];
    let question = await Question.findById(r.questionId);

    if (topics[question.topic]) {
      // If the topic has already come before
      if (r.answer === question.answer) {
        topics[question.topic] = {
          correct: topics[question.topic].correct + 1,
          total: topics[question.topic].total + 1,
        };
      } else {
        topics[question.topic] = {
          ...topics[question.topic],
          total: topics[question.topic].total + 1,
        };
      }
    } else {
      // New Topic Encountered
      if (r.answer === question.answer) {
        topics[question.topic] = { correct: 1, total: 1 };
      } else {
        topics[question.topic] = { correct: 0, total: 1 };
      }
    }
  }
  console.log(topics);
  return topics;
}

module.exports = router;
