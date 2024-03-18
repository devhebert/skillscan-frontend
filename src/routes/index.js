import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import User from "../pages/User";
import Technology from "../pages/Tehcnology";
import Course from "../pages/Course";
import Question from "../pages/Question";
import QuizAttempt from "../pages/QuizAttempt";
import Login from "../pages/Login";
import PrivateRoute from "../components/privateroute";

const RoutesApp = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={"/home"} element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path={"/user"} element={<PrivateRoute><User/></PrivateRoute>}/>
            <Route path={"/technology"} element={<PrivateRoute><Technology/></PrivateRoute>}/>
            <Route path={"/course"} element={<PrivateRoute><Course/></PrivateRoute>}/>
            <Route path={"/question"} element={<PrivateRoute><Question/></PrivateRoute>}/>
            <Route path={"/quiz-attempt"} element={<PrivateRoute><QuizAttempt/></PrivateRoute>}/>
            <Route path={"/quiz-attempt"} element={<PrivateRoute><QuizAttempt/></PrivateRoute>}/>
        </Routes>
    )
}

export default RoutesApp;