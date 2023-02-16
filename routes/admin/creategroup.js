const router = require('express').Router();
const Employee = require('../../models/Employee');
const auth = require('../../middleware/authAdmin');

const { check, validationResult } = require('express-validator');
const Group = require('../../models/Group');
const config = require('config');
const {
  serverErrorResponse,
  failErrorResponse,
} = require('../../helpers/responseHandles');

//getallemployees
router.get('/all', auth, async (req, res) => {
    try {
      const employees = await Employee.find();
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

//getemployeesbydept
router.get('/:dep', auth, async (req, res) => {
    try {
      const employees = await Employee.find({ DepName: req.params.dep});
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

//create a batch

router.post(
    '/create/batch',
    [
    //   auth,
      [
        check('groupNo', 'Please Enter a valid Batch Number').not().isEmpty(),
        check('dept', 'Please Enter department name')
          .not()
          .isEmpty(),
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
      const { groupNo, dept } = req.body
    
      const response = await Group.create({
        groupNo,
        dept,
        employee: [],
    })
  
  
        return res.json({
          status: "success",
          data: {
            response,
          },
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(serverErrorResponse());
      }
    }
  );

//get courses
router.get('/get/allbatch', auth, async (req, res) => {

	try {
		const batches = await Group.find().populate('employee');
		res.send(batches);
	} catch (error) {
		res.send(error);
	}
})
// get batch by id
router.get('/get/singlebatch/:id', auth, async (req, res) => {

	try {
		const batch = await Group.findById(req.params.id).populate('employee');
		res.send(batch);
	} catch (error) {
		res.send(error);
	}
})
// add employee to batch

router.put('/update/addemployee/:id' , (req,res)=>{
	Employee.findByIdAndUpdate(
					{_id: req.params.id},
					{
						 "$push": { "Batch" :  req.body.group  }

					},{
						new: true
					},
					(err,doc)=>{
						if(err){
							throw err
						}
						else{
							res.json(doc);
						}
					}
					)
                    // update isallocated column
                    Employee.findByIdAndUpdate(
                        {_id: req.params.id},
                        {
                             "isAllocated" :"YES"
                             
                        },{
                            new: true
                        },
                        (err,doc)=>{
                            if(err){
                                throw err
                            }
                            else{
                                console.log("d",doc);
                            }
                        }
                        )
					// Update students collection
					Group.findByIdAndUpdate(
						{_id: req.body.group},
						{
							 "$push": { "employee" :  req.params.id  }
						},{
							new: true
						},
						(err,doc)=>{
							if(err){
								throw err
							}
							else{
								console.log(doc);
							}
						}
						)
})




module.exports = router;
