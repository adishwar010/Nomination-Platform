const Batch = require("../../models/Batch");
const Subtopic = require("../../models/SubTopic");
const Admin = require("../../models/Admin");
const Event = require("../../models/Event");
const { check, validationResult } = require("express-validator");
const router = require("express").Router();
const auth = require("../../middleware/authAdmin");
const {
  serverErrorResponse,
  failErrorResponse,
} = require("../../helpers/responseHandles");

const { l3students } = require("../../helpers/l3students");

router.post(
  "/batch",
  [
    [
      check(
        "maxStudent",
        "Please Specify Maximum number of students in the batch"
      )
        .not()
        .isEmpty(),
    ],
    auth,
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Please Specify all the fields");
      }

      const batch = new Batch({
        maxNumberOfStuden: req.body.maxStudent,
      });

      await batch.save();

      res.json({
        status: "success",
        data: {
          batch,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/batch", auth, async (req, res) => {
  try {
    const batches = await Batch.find().populate("events");
    return res.json({
      status: "success",
      data: {
        batches,
        length: batches.length,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

router.get("/batch/:batchId", auth, async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.batchId;
    console.log(id);
    const batch = await Batch.findById(id).populate("events");
    if (!batch) {
      return res
        .status(400)
        .json(failErrorResponse("No Batch found or Batch Id invalid"));
    }

    // Batch exits
    return res.json({
      status: "success",
      data: {
        batch,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

// Get all subtopics
router.get("/subtopic", auth, async (req, res) => {
  try {
    const subtopics = await Subtopic.find();
    return res.json({
      status: "success",
      data: {
        subtopics,
        length: subtopics.length,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

// Get a particular Subtopic
router.get("/subtopic/:id", auth, async (req, res) => {
  try {
    const subtopic = await Subtopic.findById(req.params.id).populate({
      path: "events",
      populate: {
        path: "testId",
      },
    });
    if (!subtopic) {
      return res.status(400).json(failErrorResponse("Invalid Id"));
    }
    return res.json({
      status: "success",
      data: { subtopic },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(serverErrorResponse());
  }
});

// Add a Subtopic
router.post("/subtopic/:batchId", auth, async (req, res) => {
  try {
    const id = req.params.batchId;
    const outline = await Batch.findById(id);
    if (!outline) {
      return res
        .status(400)
        .json(failErrorResponse("No Batch found or Batch ID is invalid"));
    }
    console.log(req.body.name);
    if (!req.body.name) {
      return res
        .status(401)
        .json(failErrorResponse("Please Specify a valid Subtopic name"));
    }

    const subtopic = new Subtopic({
      name: req.body.name,
      program: req.body.program ? req.body.program : "L2",
    });

    await subtopic.save();
    return res.json({ status: "success", data: { subtopic } });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

// Add a Event
router.post(
  "/event/:subTopicId",
  [
    [
      check("type", "Please specify a type").not().isEmpty(),
      check("startTime", "Please specify a Start Date").not().isEmpty(),
      check("endTime", "Please specify a End Date").not().isEmpty(),
    ],
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const id = req.params.subTopicId;
    if (!errors.isEmpty()) {
      return res.status(400).json(failErrorResponse(errors.errors[0].msg));
    }
    try {
      // Check if batch exits.
      const subtopic = await Subtopic.findById(id);
      if (!subtopic) {
        return res
          .status(400)
          .json(
            failErrorResponse("No Subtopic found or Subtopic ID is invalid")
          );
      }
      const type = req.body.type;
      // Add the event by creating a Event object
      if (type) {
        if (
          !(
            type === "test" ||
            type === "assignment" ||
            type === "liveClass" ||
            type === "readingMaterial"
          )
        ) {
          return res
            .status(400)
            .json(failErrorResponse('Please Specify the proper "Type" Field'));
        }
      }

      // Logic to add a Event
      const startDate = new Date(req.body.startTime);
      const endDate = new Date(req.body.endTime);

      // @TODO Add a check if last one if the event added is a test, add a feedback form after that

      const event = new Event({
        eventType: type,
        startTime: startDate,
        endTime: endDate,
        createdBy: req.user.id,
      });

      await event.save();

      subtopic.events.push(event._id);
      await subtopic.save();

      res.json({
        status: "success",
        data: {
          event,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  }
);

module.exports = router;
