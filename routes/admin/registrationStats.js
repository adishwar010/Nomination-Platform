const router = require('express').Router();
const User = require('../../models/User');
const auth = require('../../middleware/authAdmin');
const Paper = require('../../models/Paper');
const config = require('config');
const {
  serverErrorResponse,
  failErrorResponse,
} = require('../../helpers/responseHandles');

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password -authenticationProvider');
    res.json({
      status: 'success',
      data: {
        users: users,
        numberOfUserRegistered: users.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get('/active', auth, async (req, res) => {
  try {
    let papers = await Paper.find({ finished: false }).select('startedAt');
    let p = await Paper.find({ finished: true }).select('startedAt');
    papers = papers.filter(
      (paper) =>
        new Date(paper.startedAt).getTime() < Date.now() &&
        new Date(paper.startedAt).getTime() >
          Date.now() - config.get('DsatTimeinMinutes') * 60 * 1000
    );
    res.json({
      status: 'success',
      data: {
        activeUser: papers.length,
        testSubmitted: p.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

// Option to delete the user from the database
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json(failErrorResponse('No such user found'));
    }
    await user.remove();
    return res.json({
      status: 'success',
      message: 'User Record Removed succesfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
