import "./App.css";
import { Route, Switch } from "react-router-dom";
import Loginout from "./pages/Loginout";
import Sidepanel from "./pages/Sidepanel";
import Instdsat from "./pages/Instdsat";
import EndTest from "./pages/Endtest";
import ReportCard from "./pages/ReportCard";
import Admin1 from "./pages/Admin1";
import AdminResult from "./pages/AdminResult";
import AdminLogin from "./pages/AdminLogin";
import AdminRoutes from "./pages/AdminRoutes";
import AdminTestSet from "./pages/AdminTestSet";
import video from "./pages/Video";
import Tables from "./pages/Tables";
import Cameraweb from "./Components/Cameraweb";
import PSDM_log from "./images/PSDM_logo.jpg";
import logonew from "./images/logonew.png";
import axios from "axios";

import logos from "./images/logos.png";
import ADSATreg from "./pages/ADSATreg";
import QuestionAddDemo from "./pages/QuestionAddDemo";
import QuestionAddLogin from "./pages/QuestionAddLogin";
import QuestionListTable from "./pages/QuestionListTable";
import AddingQuestionRoute from "./pages/AddingQuestionRoute";
import SignIn from "./pages/SignIn";
import SlotsChecking from "./pages/SlotsChecking";
import StudentPerSlot from "./pages/StudentPerSlot";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/TrainingProgram/Admin";
import CreateBatch from "./pages/TrainingProgram/CreateBatch";
import TimeTable from "./pages/TrainingProgram/TimeTable";
import Users from "./pages/TrainingProgram/Users";
import ModulesTest from "./pages/TrainingProgram/ModulesTest";
import TestDetails from "./pages/TrainingProgram/TestDetails";
import AddQuestion from "./pages/TrainingProgram/AddQuestion";
import TestQuestionsDatabase from "./pages/TrainingProgram/TestQuestionsDatabase";
import AllTest from "./pages/TrainingProgram/User/AllTest";
import UserSignup from "./pages/TrainingProgram/User/UserSignup";
import TestInstructions from "./pages/TrainingProgram/User/TestInstructions";
import TestPanel from "./pages/TrainingProgram/User/TestPanel";
import TestEnded from "./pages/TrainingProgram/User/TestEnded";
import UserSignin from "./pages/TrainingProgram/User/UserSignin";
import AllTestResults from "./pages/TrainingProgram/User/AllTestResults";
import DetailResult from "./pages/TrainingProgram/User/DetailResult";
import ModuleTest from "./pages/TrainingProgram/User/ModuleTest";
import AdminModules from "./pages/TrainingProgram/AdminModules";
import L2Result from "./pages/TrainingProgram/L2Result";
import L2ResultTable from "./pages/TrainingProgram/L2ResultTable";
import ResultWithQuestions from "./pages/TrainingProgram/User/ResultWithQuestions";
import ResultData from "./pages/TrainingProgram/ResultData";
import StudentDashboard from "./pages/TrainingProgram/User/StudentDashboard";
import AdminAllModules from "./pages/TrainingProgram/AdminAllModules";
import QuestionAddExcel from "./pages/QuestionAddExcel";
import ResultDropDown from "./pages/TrainingProgram/User/ResultDropDown";
import ImportData from "./pages/ImportData";
import AssignBatch from "./pages/AssignBatch";
import AllocatedEmployees from "./pages/AllloctedEmployees";
import EmployeeDetails from "./pages/EmployeeDetails";


// axios.defaults.baseURL = "https://adsatiitropar.com";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={UserSignin} />
        <Route path="/signup" component={Loginout} />
        <Route path="/sidepanel" component={Sidepanel} />
        <Route path="/instdsat" component={Instdsat} />
        <Route path="/finish" component={EndTest} />
        <Route path="/repadmin1ortcard" component={ReportCard} />
        <Route path="/admin1" component={Admin1} />
        <Route path="/adminresult" component={AdminResult} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/adminroutes" component={AdminRoutes} />
        <Route path="/settest" component={AdminTestSet} />
        <Route path="/video" component={video} />
        <Route path="/tables" component={Tables} />
        <Route path="/camera" component={Cameraweb} />
        <Route path="/A-DSAT_Registration" component={ADSATreg} />
        <Route path="/adminallmodules" component={AdminAllModules} />
        <Route path="/resultdd" component={ResultDropDown} />

        <Route path="/addingquestions" component={QuestionAddDemo} />
        <Route path="/questionaddlogin" component={QuestionAddLogin} />

        <Route path="/questiontable" component={QuestionListTable} />
        <Route path="/questionroutes" component={AddingQuestionRoute} />

        {/* /////////////////// */}
        {/* <Route path="/signin" component={SignIn} /> */}
        <Route path="/studentslots" component={SlotsChecking} />
        <Route
          path="/studentsperslot"
          render={(props) => <StudentPerSlot {...props} />}
        />
        <Route path="/resetpassword" component={ResetPassword} />

        {/* //////////// Training Programs Admin Route ///////////////// */}
        <Route path="/trainingadmin" component={Admin} />
        <Route path="/createbatch" component={CreateBatch} />
        <Route path="/classtimetable" component={TimeTable} />
        <Route path="/ModulesTest/:id" component={ModulesTest} />
        <Route path="/testdetails/:id" component={TestDetails} />
        <Route path="/addquestionstest/:id" component={AddQuestion} />
        <Route path="/exceladdquestionstest/:id" component={QuestionAddExcel} />
        <Route
          path="/testquestiondatabase/:id"
          component={TestQuestionsDatabase}
        />
        <Route path="/modulewiseresult" component={L2Result} />
        <Route path="/resulttable/:id/:type" component={L2ResultTable} />
        <Route path="/testresult/:id" component={ResultWithQuestions} />

        {/* //////////// Training Programs User Route ///////////////// */}
        {/* <Route path="/studentsignup" component={UserSignup} /> */}
        <Route path="/alltest" component={AllTest} />
        <Route path="/studentdashboard" component={StudentDashboard} />
        {/* //////////// Training Programs User Test Route ///////////////// */}
        <Route path="/testinstructions/:id" component={TestInstructions} />
        <Route path="/test/:id" component={TestPanel} />
        <Route path="/testended" component={TestEnded} />
        <Route path="/alltestresults" component={AllTestResults} />
        <Route path="/detailedresult" component={DetailResult} />
        <Route path="/moduletest/:id" component={ModuleTest} />
        <Route path="/adminmodule/:id" component={AdminModules} />
        <Route path="/studentnotgiventest/:id/:type" component={ResultData} />

        <Route path="/importdata" component={ImportData} />
        <Route path="/assignbatch" component={AssignBatch} />
        <Route path='/allocatedemployees' component={AllocatedEmployees}/>
        <Route path='/empdetails' component={EmployeeDetails}/>
        
      </Switch>
    </>
  );
}

export default App;
