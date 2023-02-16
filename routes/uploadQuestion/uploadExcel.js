const router = require('express').Router();
const Question = require('../../models/Questions');
const Test = require('../../models/Test');
const mongoose = require('mongoose');
// var ObjectId = require('mongodb').ObjectID;
const { ObjectId } = require('mongodb');
var XLSX = require('xlsx');
var multer = require('multer');

var excelToJson = require('convert-excel-to-json');

const {
    serverErrorResponse,
    failErrorResponse,
} = require("../../helpers/responseHandles");
const { json } = require("body-parser");

//multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });
var questions = [];

router.post('/addExcelQuestions/', upload.single('file'), async (req, res) => {
    try {
        const testID = (req.body.testID).trim();
        // const id = mongoose.Types.ObjectId(testID)
        // console.log(mongoose.Types.ObjectId(testID));
        const test = await Test.findById({ _id: ObjectId(testID) });
        if (!test) {
            return res
                .status(400)
                .json(
                    failErrorResponse(
                        'Either the test or the quesiton with the specified id does not exist'
                    )
                );
        }
        if (test.questionBank.length >= test.numberOfQuestions) {
            return res
                .status(400)
                .json(
                    failErrorResponse('The Number of question for the test has exceeded')
                );
        }


        var workbook = XLSX.readFile(req.file.path);
        var sheet_namelist = workbook.SheetNames;
        var x = 0;
        sheet_namelist.forEach(element => {
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
            // console.log("xlData",xlData);
            Question.insertMany(xlData, (err, data) => {
                if (err) {
                    // console.log("error aaya bhaiya");
                    console.log(err);
                } else {
                    console.log(data);
                }
            })
            x++;
        });


        // await Question.save();
        res.json({
            status: 'success',
            data: {
                Question,
            },
        });
    } catch (err) {
        console.log(err);
        console.log('This is the rejected field ->', err.field);
        res.status(500).json(serverErrorResponse());
    }
});


router.post('/uploadfile/:id', upload.single("excel"), async (req, res) => {
    const testID = req.params.id;
        const test = await Test.findById({ _id: ObjectId(testID) });
        if (!test) {
            return res
                .status(400)
                .json(
                    failErrorResponse(
                        'Either the test or the quesiton with the specified id does not exist'
                    )
                );
        }
        if (test.questionBank.length >= test.numberOfQuestions) {
            return res
                .status(400)
                .json(
                    failErrorResponse('The Number of question for the test has exceeded')
                );
        }
        // const excelFile = req.file; 
        // console.log(excelFile);
    importExcelData2MongoDB(testID, req.file.path);

    // console.log("question id",questions);
    return res.json({
        status: "success",
      });
    // console.log(res);
});
// Import Excel File to MongoDB database
async function importExcelData2MongoDB(testID, filePath) {

    // -> Read Excel File to Json Data
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [{
            // Excel Sheet Name
            name: 'Book1',
            // Header Row -> be skipped and will not be present at our result object.
            header: {
                rows: 1
            },
            // Mapping columns to keys
            columnToKey: {
                A: 'text',
                B: 'Aimageurl',
                C: 'Atext',
                D: 'Bimageurl',
                E: 'Btext',
                F: 'Cimageurl',
                G: 'Ctext',
                H: 'Dimageurl',
                I: 'Dtext',
                J: 'answer',
                K: 'category',
                L: 'questionImage',
                M: 'difficulty',
                N: 'topic',
                O: 'subtopic',
            }
        }]
    });

    console.log("excel Data", excelData);
    // console.log(typeof excelData.Book1);
    

    excelData.Book1.forEach(async(curr) => {
        // console.log(`
        //     text: ${curr.text},
        //     Atext: ${curr.Atext},
        //     Btext: ${curr.Btext},
        //       Ctext: ${curr.Ctext},
        //       Dtext: ${curr.Dtext},
        //     category: ${curr.category},
        //     answer: ${curr.answer},
        //     difficulty: ${curr.difficulty},
        //     topic: ${curr.topic},
        //     subtopic: ${curr.subtopic},
        //   `);
        const question = new Question({
            text: curr.text,
            A: {text: curr.Atext},
            B: {text: curr.Btext},
              C: {text: curr.Ctext},
              D: {text: curr.Dtext},
            category: curr.category,
            answer: curr.answer,
            difficulty: curr.difficulty,
            topic: curr.topic,
            subtopic: curr.subtopic,
          });

          await question.save();


        Test.findByIdAndUpdate(
            {_id: testID},
            {
                 "$push": { "questionBank" :  question._id }
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

    
}

module.exports = router;