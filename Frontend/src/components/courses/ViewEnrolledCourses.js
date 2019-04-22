import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getStudentCourses } from "../../actions/courseActions";
import Spinner from "../common/Spinner";
import Courses from "../dashboard/EnrolledCourses";
import { MDBDataTable } from "mdbreact";
class ViewEnrolledCourses extends Component {
  componentDidMount() {
    this.props.getStudentCourses(this.props.auth.user.id);
  }

  render() {
    const { courses, loadin } = this.props.courses;
    let dashboardContent;

    if (courses === null || loadin) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(courses).length > 0) {
        dashboardContent = (
          <div>
            <Link to="/dashboard" className="btn btn-light">
              Dashboard
            </Link>
            <Link to="/enroll-course" className="btn btn-light">
              Enroll Course
            </Link>

            <Courses courses={courses} />
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <Link to="/dashboard" className="btn btn-light">
              Dashboard
            </Link>
            <p>You have no courses yet, please add course by pressing below.</p>
            <Link to="/enroll-course" className="btn btn-lg btn-info">
              Enroll Course
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Courses</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewEnrolledCourses.propTypes = {
  getStudentCourses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  courses: state.courses
});

export default connect(
  mapStateToProps,
  { getStudentCourses }
)(ViewEnrolledCourses);
