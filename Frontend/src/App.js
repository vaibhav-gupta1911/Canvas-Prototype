import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileAction";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
//import Navbar from "./components/LandingPage/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profilex from "./components/profile/testProfile";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import AddCourse from "./components/add-credentials/CreateCourse";
import ViewCourses from "./components/courses/ViewCourses";
import EnrollCourse from "./components/courses/EnrollCourse";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
//import EnrollCourse from "./components/courses/EnrollCourse";
//import Profile from "./components/profile/Profile";
import ViewEnrolledCourses from "./components/courses/ViewEnrolledCourses";
import ViewStudents from "./components/courses/ViewStudents";

import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";
import EnrollDashboard from "./components/courses/EnrollDashboard";
import UploadNotesAndFiles from "./components/notes/UploadNotesAndFiles";
import ViewUploadedFilesStudent from "./components/notes/ViewUploadedFilesStudent";

import CourseDashboard from "./components/coursesDashboard/CourseDashboard";
import PDFViewer from "./components/PDFViewer/PDFViewer";
import PDFJSBackend from "./backend/pdfjs";
import CreateAssignments from "./components/assignments/CreateAssignments";

import FacultyDashboard from "./components/facultyDashboard/FacultyDashboard";
import ViewAssigmentsStudent from "./components/assignments/ViewAssigmentsStudent";
import ViewSingleAssignment from "./components/assignments/ViewSingleAssignment";
import ViewProfessorAssignmentsList from "./components/assignments/ViewProfessorAssignmentsList";
import ViewSubmissions from "./components/assignments/ViewSubmissions";
import GradeAssignment from "./components/assignments/GradeAssignment";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              {/* <Route path="/" component={Navbar} /> */}
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profilex" component={Profilex} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/coursedashboard"
                  component={CourseDashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-course"
                  component={AddCourse}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/view-course"
                  component={ViewCourses}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/view-students/:uid"
                  component={ViewStudents}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/viewprofassignment/:item"
                  component={ViewProfessorAssignmentsList}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/facultydashboard"
                  component={FacultyDashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/gradeassignment/:item"
                  component={GradeAssignment}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/view-enrolled"
                  component={ViewEnrolledCourses}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/enroll-course1"
                  component={EnrollCourse}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/enroll-course"
                  component={EnrollDashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/createassignment/:item"
                  component={CreateAssignments}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/viewuploads/:uid"
                  component={ViewUploadedFilesStudent}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/uploadnotes"
                  component={UploadNotesAndFiles}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/showassignments/:item"
                  component={ViewAssigmentsStudent}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/viewsubassignment/:item"
                  component={ViewSubmissions}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/viewassignment/:id"
                  component={ViewSingleAssignment}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
