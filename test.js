const Questions = require("./models/Questions");
const User = require("./models/User");
require("./config/db")();
require("./Nodemailer/mailTemplates/mailSendingWithTimeslot");
const uploadFile = require("./Aws/s3");

const addQuestion = async () => {
  try {
    questionList.forEach(async (q) => {
      const question = new Questions({
        text: q.questiontext,
        A: q.A,
        B: q.B,
        C: q.C,
        D: q.D,
        answer: q["Answer 1"],
        category: "ir",
      });
      await question.save();
      console.log("question created and saved");
    });
  } catch (err) {
    console.log(err);
  }
};

//uploadFile(require("path").join(__dirname, "Aws", "cat.jpg"));

const filterUser = async () => {
  try {
    let count = 0;
    const users = await User.find();
    for (let i = 0; i < users.length; i++) {
      //console.log(users);
      console.log(users[i].registeredAt);
      console.log(users[i].registeredAt.getDate());
      if (users[i].registeredAt && users[i].registeredAt.getDate() > 22) {
        console.log(users[i]);
        count++;
      }
    }

    console.log("The total number of users registered are : ", count);
  } catch (err) {
    console.log(err);
  }
};

setTimeout(() => filterUser(), 1000);

const questionList = [
  {
    questionname: "Question1",
    questiontext:
      "Aniket ranks 16th from the top and 15th from the bottom in a certain exam.How many students are there in his class?",
    A: "30",
    B: "35",
    C: "40",
    D: "31",
    "Answer 1": "A",
  },
  {
    questionname: "Question2",
    questiontext:
      "Aman is 16th from the left end in a row of a boys and sunil is4th to the left of aman.Then find the position of sunil from the left end ",
    A: " 14th ",
    B: " 12th ",
    C: " 16th  ",
    D: " 13th ",
    "Answer 1": "B",
  },
  {
    questionname: "Question3",
    questiontext:
      "If A is to the south of B and C is to the east of B, in what direction is A with respect to C? ",
    A: " North-east ",
    B: " North-west  ",
    C: " south-east  ",
    D: " South west ",
    "Answer 1": "D",
  },
  {
    questionname: "Question4",
    questiontext:
      "R ohan walks a distance of 3 km towards North,then turns to his Left and walks for 2 km. he again turns left and walks for 3 km. At this point he turns to his left and walks for 3km. How many km is he from the starting point? ",
    A: " 1km  ",
    B: " 2km ",
    C: " 3km  ",
    D: " 5km ",
    "Answer 1": "A",
  },
  {
    questionname: "Question5",
    questiontext:
      "if X is the brother of the son of Y's son, how is X related to Y? ",
    A: " Son  ",
    B: " brother  ",
    C: " Cousin  ",
    D: " Grandson ",
    "Answer 1": "D",
  },
  {
    questionname: "Question6",
    questiontext:
      "B is husband of P .Q is the only grandson of E,who is wife of D and mother in law of P .How is B related to D? ",
    A: " Nephew  ",
    B: " Cousin  ",
    C: " Son-in-law  ",
    D: " Son ",
    "Answer 1": "D",
  },
  {
    questionname: "Question7",
    questiontext:
      "E is the son of A.D is the son of B.Eis married to C.C is B's daughter. How is D related to E? ",
    A: " Brother  ",
    B: " Uncle ",
    C: " Father-in-law  ",
    D: " Brother-in law ",
    "Answer 1": "D",
  },
  {
    questionname: "Question8",
    questiontext:
      'If in a certain code "LUTE" is written as "MUTE" and "FATE" is written as "GATE" then how will "BLUE" be written in that code? ',
    A: "  CLUE  ",
    B: "  GLUE ",
    C: " FLUE  ",
    D: "  SLUE ",
    "Answer 1": "A",
  },
  {
    questionname: "Question9",
    questiontext:
      'If in a certain language "MADRAS" is coded as "NBESBT", how "BOMBAY" coded in that language? ',
    A: "  CPNCBX ",
    B: "  CPNCBZ ",
    C: "  CPOCBZ  ",
    D: "  CQOCBZ ",
    "Answer 1": "B",
  },
  {
    questionname: "Question10",
    questiontext:
      'In a certain language "CLOUD" is written as "GPRKF" then how is "SIGHT" written in that language? ',
    A: "  UGHHT ",
    B: "  UHJFW  ",
    C: "  WFJGV  ",
    D: "  WGJHV ",
    "Answer 1": "D",
  },
  {
    questionname: "Question11",
    questiontext:
      'In a certain code language "253" means "BOOKS ARE OLD", "546" means "MAN IS OLD" and "378" means "BUY GOOD BOOKS". What stands for "ARE" in that code? ',
    A: "2",
    B: "4",
    C: "5",
    D: "6",
    "Answer 1": "C",
  },
  {
    questionname: "Question12",
    questiontext:
      'In a certain code "467" means "LEAVES ARE GIVEN", "485" means "GREEN IS GOOD" and "639" means "THEY ARE PLAYING". Which digit stands for "LEAVES" in that code? ',
    A: "4",
    B: "6",
    C: "7",
    D: "3",
    "Answer 1": "C",
  },
  {
    questionname: "Question13",
    questiontext: "ABABCABCDABCD? ",
    A: "A",
    B: "B",
    C: "E",
    D: "C",
    "Answer 1": "C",
  },
  {
    questionname: "Question14",
    questiontext: "ZZYZYXZYXWZY? ",
    A: "Z",
    B: "Y",
    C: "X",
    D: "W",
    "Answer 1": "C",
  },
  {
    questionname: "Question15",
    questiontext:
      '"This book will help because all good book helps" . Conclusion=?? ',
    A: '"This is not a good book"',
    B: '  "This is good book"  ',
    C: '"No good book helps"',
    D: '"Some good books Helps"',
    "Answer 1": "B",
  },
  {
    questionname: "Question16",
    questiontext: '"All beggars are poor". Conclusion=?? ',
    A: '"If a is a beggar, then a is not rich".',
    B: '"If a is not rich then a is not a beggar".',
    C: '"If a is rich, then a is not a beggar"',
    D: '"Both A and C"',
    "Answer 1": "D",
  },
  {
    questionname: "Question17",
    questiontext:
      "Adam walks 10 km towards north, from there he walks 6Km towards South. Then he walks 3 km towards east. How far and in which direction is he with reference to his starting point \r\n ",
    A: " 6 km, West  ",
    B: " 5km East ",
    C: "7km East",
    D: "5km north East ",
    "Answer 1": "D",
  },
  {
    questionname: "Question18",
    questiontext:
      "Joe moved a distance of75 metres towards south, She then turned towards right and walks 25 metres .then she turns right again and walked 80metres .Finally she turned to the left at an angle of 45 degree .In which direction was she moving finally ",
    A: " North -east ",
    B: "  North-West ",
    C: " South ",
    D: " South West ",
    "Answer 1": "B",
  },
  {
    questionname: "Question19",
    questiontext:
      "A bus for London leaves every 40 minutes from a bus stand. An enquiry clerk told a passenger that the bus had already left 20 minutes ago and the next bus will leave at 9.45 a.m. at what time did the enquiry clerk give this information to the passenger?\r\n ",
    A: " 9.10am ",
    B: " 9.25am ",
    C: " 9.08am ",
    D: " 9.15am ",
    "Answer 1": "B",
  },
  {
    questionname: "Question20",
    questiontext:
      "If ranks of five candidates P, Q, R, S and T are arranged in ascending order of their marks in Numerical Ability, T is the fourth and S is the first. When they are arranged in the ascending order of marks in General Awareness, P takes the place of T and T takes the place of Q. R’s position remains the same in both the arrangements. Q’s marks are lowest in one test and highest in the other test. P has more marks than R in Numerical Ability.\r\nWhose marks in General Awareness are more than R’s marks in General Awareness?\r\n\r\n ",
    A: " P’s, S’s and T’s ",
    B: " P’s, Q’s and S’s ",
    C: " P’s, Q’s and T’s ",
    D: " Only P’s ",
    "Answer 1": "A",
  },
  {
    questionname: "Question21",
    questiontext:
      "If the 7th day of a month is 4 days earlier than Saturday, what day it will be on the 19th day of a month? ",
    A: "  Sunday ",
    B: " Monday ",
    C: " Saturday  ",
    D: " Friday ",
    "Answer 1": "C",
  },
  {
    questionname: "Question22",
    questiontext:
      "In a row of 25 girls, Susan was shifted by four places towards right ,she became 16th from left end. What was her earlier position from the right end of the row? ",
    A: " 9th ",
    B: " 10th ",
    C: " 11th ",
    D: " 14th ",
    "Answer 1": "d",
  },
  {
    questionname: "Question23",
    questiontext:
      "The future of women in India is quite bright and let us hope that they will justify their abilities by rising to the occasion. Napoleon was right when he declared that by educating the women we can educate the whole nation. Because a country can never rise without the contribution of 50% of their population. The passage best supports the statement that:",
    A: "India is striving hard for the emancipation of women.",
    B: "all women should be well educated.",
    C: "a nation can progress only when women are given equal rights and opportunities as men.",
    D: " women ought to be imparted full freedom to prove their worth and contribute to the progress of the nation.",
    "Answer 1": "D",
  },
  {
    questionname: "Question24",
    questiontext: "PAIN:SEDATIVE ",
    A: " comfort: stimulant ",
    B: " grief: consolation",
    C: "trance: narcotic ",
    D: "ache: extraction ",
    "Answer 1": "B",
  },
  {
    questionname: "Question25",
    questiontext: "AFTER:BEFORE\r\n ",
    A: "first: second",
    B: "present:past",
    C: "contemporary:historic ",
    D: "successor:predecessor",
    "Answer 1": "D",
  },
];
