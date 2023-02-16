const router = require('express').Router();
const User = require('../../models/User');
const TimeSlot = require('../../models/timeSlot');
const auth = require('../../middleware/authAdmin');
const { serverErrorResponse } = require('../../helpers/responseHandles');

router.get('/', auth, async (req, res) => {
  try {
    const timeslots = await TimeSlot.find();
    res.json({
      status: 'success',
      data: {
        timeslots,
        length: timeslots.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const timeSlot = await TimeSlot.findById(req.params.id);
    const users = await User.find({ timeSlot: timeSlot._id }).select(
      '-password -registrationMailSent -slotAlloted -timeSlotMailSent -timeSlot -authenticationProvider'
    );
    res.json({
      status: 'success',
      data: {
        timeSlot,
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
