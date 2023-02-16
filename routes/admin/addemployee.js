const Employee = require('../../models/Employee');
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/authAdmin');
const {
  serverErrorResponse,
  failErrorResponse,
} = require('../../helpers/responseHandles');
const ObjectId = require('mongoose').Types.ObjectId;



router.post(
  '/addemployee',
  [
    auth,
    [
      check('STNO', 'Please Enter a valid ST Number').not().isEmpty(),
      check('Name', 'Please Enter name')
        .not()
        .isEmpty(),
      check('PersNO', 'Marks Per Questio is required')
        .not()
        .isEmpty(),
    //   check(
    //     'negativeMarksPerQuestion',
    //     'Negative Marks Per Question is required'
    //   )
    //     .not()
    //     .isEmpty(),
    //   check('durationOfTest', 'Duration Of Test is required').not().isEmpty(),
    //   check('password', 'password is required')
    //     .not()
    //     .isEmpty()
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(failErrorResponse(errors.errors[0].msg));
      }

    //   //
    console.log("req.body",req.body);
      let emp = new Employee({
        ...req.body
      });
    //   question = new Question({
    //     text: req.body.questionText,
    //     A: {
    //       ...req.body.options[0],
    //     },
    //     B: { ...req.body.options[1] },
    //     C: { ...req.body.options[2] },
    //     D: { ...req.body.options[3] },
    //     category: req.body.category,
    //     answer: req.body.answer,
    //     difficulty: req.body.difficulty,
    //     topic: req.body.topic,
    //     subtopic: req.body.subtopic,
    //   });

      
      await emp.save();

      

      return res.json({
        status: "success",
        data: {
          Employee,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  }
);

router.get('/get/employee/:id', auth, async (req, res) => {

	try {
		const emp = await Employee.findById(req.params.id).populate('Batch');
		res.send(emp);
	} catch (error) {
		res.send(error);
	}
})



module.exports = router;
