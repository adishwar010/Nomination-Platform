const router = require('express').Router();
const Admin = require('../../models/Admin');
const { check, validationResult } = require('express-validator');
const {
  serverErrorResponse,
  failErrorResponse,
} = require('../../helpers/responseHandles');
const jwt = require('jsonwebtoken');
const config = require('config');

router.use('/questions', require('./addQuestion'));
router.use('/timeslots', require('./timeSlots'));
router.use('/result', require('./results'));
router.use('/test', require('./createNewTest'));
router.use('/registrationStats', require('./registrationStats'));
router.use('/course', require('./createCourseOutline'));
router.use('/results', require('./results'));
router.use('/excelData', require('./excelStatsData'));
router.use('/addemployees', require('./addemployee'));
router.use('/employeeStats', require('./employeeStats'));

router.use('/batch', require('./creategroup'));


router.post(
  '/login',
  [
    check('username', 'Please Provide a username').not().isEmpty(),
    check('password', 'Please Enter your password').not().isEmpty(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Please specify all the field');
        error.status = 400;
        throw error;
      }

      const { username, password } = req.body;

      let user = await Admin.findOne({ username });
      console.log(user);
      if (!user) {
        throw new Error('No Such User Present');
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          return res
            .status(400)
            .json(failErrorResponse('Credentials Provided are not correct'));
        }
        
        const payload = {
          user: {
            id: user._id,
          },
        };

       

        jwt.sign(
          payload,
          config.get('JSONTokenSecretAdminUser'),
          { expiresIn: 3600000 },
          (err, token) => {
            if (err) throw err;
            return res.json({
              status: 'success',
              data: {
                token
              },
              dept: user.dept
            });
          }
        );
      },
      );
    } catch (err) {
      next(err);
    }
  }
);

// TODO: This is development route and needs to be removed before pusing the code to prodution
router.post('/create/new', async (req, res) => {
  try {
    const { username, password, dept } = req.body;
    let user = new Admin({
      username,
      password,
      dept,
    });
    await user.save();
    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(payload, config.get('JSONTokenSecretAdminUser'), (err, token) => {
      if (err) throw err;
      return res.json({
        status: 'success',
        data: {
          token,
        },
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

module.exports = router;
