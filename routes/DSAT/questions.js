const router = require("express").Router();
const Questions = require("../../models/Questions");
const {
  failErrorResponse,
  serverErrorResponse,
} = require("../../helpers/responseHandles");

router.get("/questions", (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
