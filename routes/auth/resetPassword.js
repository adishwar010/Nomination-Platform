const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const {
  failErrorResponse,
  serverErrorResponse,
} = require("../../helpers/responseHandles");
const crypto = require("crypto");
const sendMailForPasswordReset = require("../../Nodemailer/mailTemplates/resetPassword");
const path = require("path");
const User = require("../../models/User");

router.post(
  "/resetPassword",
  [check("email", "Please specify an email")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return req
          .status(401)
          .json(failErrorResponse("Please Specify a valid email"));
      }
      const user = await User.findOne({ email: req.body.email });
      if (
        !user &&
        user.authenticationProvider &&
        user.authenticationProvider !== "google"
      ) {
        return res
          .status(404)
          .json(
            failErrorResponse("No such email address exists or is invalid ")
          );
      }
      const random = await crypto.randomBytes(15);
      const resetPasswordToken = random.toString("hex");
      user.resetPasswordToken = resetPasswordToken;
      await user.save();
      console.log(user.email);
      sendMailForPasswordReset(user.email, user.resetPasswordToken);
      res.json({
        message: "success",
        data: {
          message: "A Link has been sent to your email to reset the password",
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse);
    }
  }
);

router.get("/resetPassword/:token", (req, res) => {
  res.sendFile(path.join(__dirname, "../../template", "resetPassword.html"));
});

router.post("/resetPassword/:token", async (req, res) => {
  console.log(req.body);
  try {
    const { password, passwordAgain } = req.body;
    if (password !== passwordAgain) {
      return res.status(401).json(failErrorResponse("Password don't match"));
    }
    const user = await User.findOne({ resetPasswordToken: req.params.token });
    if (!user) {
      return res
        .status(404)
        .json(failErrorResponse("The Link seems to be Invalid"));
    }
    user.password = password;
    await user.save();
    res.send(
      "password succesfully changed, close this window and login again with the new password"
    );
  } catch (err) {
    console.log(err);
    res.status.json(serverErrorResponse());
  }
});

module.exports = router;
