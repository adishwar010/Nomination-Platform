const router = require("express").Router();
const config = require("config");
const auth = require("../../middleware/auth");
const {
  serverErrorResponse,
  failErrorResponse,
} = require("../../helpers/responseHandles");
const User = require("../../models/User");
const Event = require("../../models/Event");
const Subtopic = require("../../models/SubTopic");
const Question = require("../../models/Questions");
const Test = require("../../models/Test");
const Paper = require("../../models/Paper");
const { check, validationResult } = require("express-validator");
const { response } = require("express");
const l3students = require("../../helpers/l3students");

//const scheduleEvent = require('../../agenda/agenda');

router.get("/subtopics", auth, async (req, res) => {
  try {
    const topics = await Subtopic.find().populate({
      path: "events",
      populate: {
        path: "testId",
        select: "durationOfTest",
      },
    });
    return res.json({
      status: "success",
      data: {
        subtopics: topics,
        length: topics.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get("/subtopics/l3", auth, async (req, res) => {
  try {
    // Check if the student is in the L3 Program list
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json(failErrorResponse("No Such User Existss"));
    }
    console.log("l3 ", l3students);
    if (!l3students.includes(user.email.toLowerCase())) {
      return res
        .status(400)
        .json(failErrorResponse("Student Not Present in the L3 Program"));
    }
    const subtopics = await Subtopic.find({ program: "L3" }).populate({
      path: "events",
      populate: {
        path: "testId",
        select: "durationOfTest",
      },
    });

    return res.json({
      status: "success",
      data: {
        subtopics,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

// TODO: Add the api to get the data of the people in the L3 Program.
router.get("/completed", auth, async (req, res) => {
  try {
    const paper = await Paper.find({ user: req.user.id }).select("testId");
    const test = await Test.find();
    return res.json({
      status: "success",
      data: {
        totalAttempted: paper.length,
        totalTest: test.length,
        precentageCompleted: paper.length / test.length,
        paper,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get("/subtopics/:id", auth, async (req, res) => {
  try {
    const topics = await Subtopic.findById(req.params.id).populate({
      path: "events",
      populate: {
        path: "testId",
      },
    });
    if (!topics) {
      return res.status(404).json(failErrorResponse("No Such Subtopic found"));
    }
    return res.json({
      status: "success",
      data: {
        subtopic: topics,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let events = await Event.find({ eventType: "test" }).populate("testId");
    console.log(events);
    let tests = await Test.find().select("-displayable -createdBy");
    events = events.filter(
      (event) =>
        event.testId.questionBank.length === event.testId.numberOfQuestions
    );

    return res.json({
      status: "success",
      data: {
        events,
        length: events.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get("/info/:testId", auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);

    if (!test) {
      return res.status(400).json(failErrorResponse("Invalid Test Id"));
    }

    return res.json({
      status: "success",
      data: {
        test,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to get all the answers sheet after test submission
router.get("/result/:testId", auth, async (req, res) => {
  try {
    const id = req.params.testId;
    const test = await Test.findById(id).populate({
      path: "questionBank",
    });
    if (!test) {
      return res.status(404).json(failErrorResponse("Invalid Test id"));
    }
    const paper = await Paper.findOne({ test: id, user: req.user.id });
    if (!paper) {
      return res.status(404).json("No Attempt for the user has been made");
    }

    // Paper validated. Now form the solution pdf.
    const questionResponses = [];
    for (let i = 0; i < test.questionBank.length; i++) {
      const question = test.questionBank[i];
      let temp;
      for (let j = 0; j < paper.responses.length; j++) {
        const response = paper.responses[j];
        if (response.questionId.toString() === question._id.toString()) {
          temp = response.answer;
        }
      }
      questionResponses.push({
        A: question.A,
        B: question.B,
        C: question.C,
        D: question.D,
        text: question.text,
        answer: question.answer,
        category: question.category,
        answeredByUser: temp ? temp : "Not Answered",
      });
    }

    return res.json({
      status: "success",
      data: {
        questionResponses,
        test,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

// Get the marks in all the test if test evalutaion done
router.get("/resultAll", auth, async (req, res) => {
  try {
    let paper = await Paper.find({ user: req.user.id })
      .populate({
        path: "test",
        select: "durationOfTest",
      })
      .select("marks test startedAt");

    paper = paper.filter(
      (p) =>
        new Date(p.startedAt).getTime() + p.test.durationOfTest * 60 * 1000 <
        Date.now()
    );
    return res.json({ status: "success", data: { paper } });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

router.get("/:testId", auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId).populate({
      path: "questionBank",
      select: "-answer",
    });
    if (!test) {
      return res.status(400).json(failErrorResponse("Invalid Test Id"));
    }

    // Check if already started an attempt
    let paper = await Paper.findOne({ user: req.user.id, test: test._id });
    if (!paper) {
      // Create a paper to mark attempt start
      paper = new Paper({
        test: req.params.testId,
        user: req.user.id,
      });

      await paper.save();

      // Schedule automatic Paper Submit
      // scheduleEvent(test.durationOfTest, paper);
    }

    paper.test = test;

    return res.json({
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

router.get("/submit/:paperId", auth, async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.paperId);
    if (!paper) {
      return res.status(400).json(failErrorResponse("Invalid Paper Id"));
    }
    if (!paper.finished)
      Paper.updateOne(
        { _id: paper._id },
        { finished: true, finishedAt: Date.now() }
      );

    return res.json({
      status: "sucess",
      message: "Test Submitted Succesfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

// Asnwer a question
// TODO: Check for time Limit in the paper
router.post(
  "/:paperId/:questionId",
  [auth, [check("answer").isLength({ min: 1, max: 1 })]],
  async (req, res) => {
    try {
      const paper = await Paper.findById(req.params.paperId).populate({
        path: "test",
        populate: {
          path: "questionBank",
        },
      });
      if (!paper) {
        return res.status(400).json(failErrorResponse("Invalid Paper Id"));
      }

      if (paper.finished) {
        return res
          .status(400)
          .json(failErrorResponse("You have already submitted the test"));
      }

      const questionBank = paper.test.questionBank;
      let flag = 0;
      for (let i = 0; i < questionBank.length; i++) {
        console.log(questionBank[i]._id);
        console.log(req.params.questionId);
        console.log(questionBank[i]._id.toString() === req.params.questionId);
        if (questionBank[i]._id.toString() === req.params.questionId) {
          flag = 1;
          break;
        }
      }
      if (flag === 0) {
        return res.status(400).json(failErrorResponse("Invalid Question Id"));
      }
      let temp = 0;
      for (let i = 0; i < paper.responses.length; i++) {
        if (
          paper.responses[i].questionId.toString() ===
          req.params.questionId.toString()
        ) {
          // await Paper.updateOne(
          //   {
          //     _id: paper._id,
          //   },
          //   {
          //     $push: {
          //       'responses.$[outer]': { answer: req.body.answer },
          //     },
          //   },
          //   {
          //     arrayFilters: [{ 'outer.questionId': req.params.questionId }],
          //   }
          // );
          paper.responses[i].answer = req.body.answer;
          await paper.save();
          console.log("Here");
          temp = 1;
        }
      }
      if (temp === 0) {
        await Paper.updateOne(
          { _id: paper._id },
          {
            $push: {
              responses: {
                questionId: req.params.questionId,
                status: "answered",
                answer: req.body.answer,
              },
            },
          }
        );
      }

      return res.json({
        status: "success",
        message: "Questions successfully answered",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  }
);

module.exports = router;
