const router = require('express').Router();
const User = require('../../models/User');
const Employee = require('../../models/Employee');
const auth = require('../../middleware/authAdmin');
const Paper = require('../../models/Paper');
const config = require('config');
const {
  serverErrorResponse,
  failErrorResponse,
} = require('../../helpers/responseHandles');

// get all employees

router.get('/allemployees', auth, async (req, res) => {
  try {
    const employees = await Employee.find().populate('Batch');
    res.json({
      status: 'success',
      data: {
        employees: employees,
        numberOfUserRegistered: employees.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

//getall un allocatedemployees
router.get('/all', auth, async (req, res) => {
    try {
      const employees = await Employee.find({isAllocated : "NO"}).populate('Batch');
      res.json({
        status: 'success',
        data: {
          employees: employees,
          numberOfUserRegistered: employees.length,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  });

  //getall allocatedemployees
router.get('/allocated/all', auth, async (req, res) => {
  try {
    const employees = await Employee.find({isAllocated : "YES"}).populate('Batch');
    res.json({
      status: 'success',
      data: {
        employees: employees,
        numberOfUserRegistered: employees.length,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(serverErrorResponse());
  }
});

//getemployeesbydept and not allocated
router.get('/:dep', auth, async (req, res) => {
    try {
      const employees = await Employee.find({ DepName: req.params.dep, isAllocated : "NO"}).populate('Batch');
      res.json({
        status: 'success',
        data: {
          employees: employees,
          numberOfUserRegistered: employees.length,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  });
//getallocated employees
router.get('/allocated/:dep', auth, async (req, res) => {
    try {
      const employees = await Employee.find({ DepName: req.params.dep, isAllocated : "YES"}).populate('Batch');
      res.json({
        status: 'success',
        data: {
          employees: employees,
          numberOfUserRegistered: employees.length,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(serverErrorResponse());
    }
  });


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
    console.log(req.params.id);
    const employee = await Employee.findById(req.params.id);
    console.log("emp",employee);
    if (!employee) {
      return res.status(400).json(failErrorResponse('No such user found'));
    }
    await employee.remove();
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
