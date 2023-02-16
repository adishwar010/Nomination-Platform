const router = require("express").Router();
const {
  serverErrorResponse,
  failErrorResponse,
} = require("../../helpers/responseHandles");
const Paper = require("../../models/Paper");
const Result = require("../../models/Result");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Questions = require("../../models/Questions");

function resultCategoryWise(category, categoryName = "other", field) {
  if (category[categoryName]) {
    if (!category[categoryName][field]) {
      category[categoryName][field] = 1;
    } else {
      category[categoryName][field] += 1;
    }
  } else {
    category[categoryName] = {};
    category[categoryName].categoryName = categoryName;
    category[categoryName][field] = 1;
  }
}

// TODO: Adapt it to for common test not only DSAT.
router.get("/generate", auth, async (req, res) => {
  try {
    let report = await Result.findOne({ user: req.user.id });
    if (report) {
      return res.json({
        status: "success",
        data: {
          report,
        },
      });
    }
    const paper = await Paper.findOne({ user: req.user.id });
    if (!paper) {
      return res
        .status(400)
        .json(
          failErrorResponse(
            "The user has not yet made an attempted for this test"
          )
        );
    }
    let attempted = 0,
      notAttempted = 0,
      correct = 0,
      incorrect = 0,
      marks = 0;
    let category = {};
    for (let i = 0; i < paper.questions.length; i++) {
      let question = paper.questions[i];
      let questionFromDatabase = await Questions.findById(question.questionId);
      if (!questionFromDatabase) continue;
      resultCategoryWise(category, question.category, "totalQuestion");
      if (question.status === "answered") {
        attempted++;
        resultCategoryWise(category, question.category, "questionAttempted");
        if (questionFromDatabase.answer === question.answer) {
          correct++;
          resultCategoryWise(category, question.category, "correct");
        } else {
          incorrect++;
        }
      } else if (question.status === "not answered") {
        notAttempted++;
      }
    }

    let categoryWise = Object.values(category);

    console.log(categoryWise);

    report = new Result({
      paperId: paper._id,
      user: req.user.id,
      marks: correct * 1.0,
      totalMarks: paper.questions.length * 1.0,
      attempted,
      correct,
      incorrect,
      notAttempted,
      totalQuestion: paper.questions.length,
      categoryWise,
    });

    await report.save();

    return res.json({
      status: "success",
      data: {
        report,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
