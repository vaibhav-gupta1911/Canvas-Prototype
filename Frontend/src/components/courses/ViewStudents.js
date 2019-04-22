import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { displayEnrolledStudents } from "../../actions/studentActions";
import Spinner from "../common/Spinner";
import Students from "../dashboard/StudentCourses";

class ViewStudents extends Component {
  componentDidMount() {
    this.props.displayEnrolledStudents(this.props.match.params.uid);
    
  }

  render() {
    const { students } = this.props.students;
    let dashboardContent;

    if (students === null) {
      dashboardContent = "";
    } else {
      // Check if logged in user has profile data
      if (Object.keys(students).length > 0) {
        dashboardContent = (
          <div>
            {/* <Link to="/dashboard" className="btn btn-light">
              Dashboard
            </Link>
            <Link to="/create-course" className="btn btn-light">
              Create Course
            </Link> */}
            <p className="lead text-muted">
              {/* Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link> */}
            </p>
            <Students coid={this.props.match.params.uid}  students={students} />
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <Link to="/dashboard" className="btn btn-light">
              Dashboard
            </Link>
            <p>No students yet for this course</p>
            {/* <Link to="/create-course" className="btn btn-lg btn-info">
              Create Course
            </Link> */}
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Students</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewStudents.propTypes = {
  displayEnrolledStudents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  students: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  students: state.students
});

export default connect(
  mapStateToProps,
  { displayEnrolledStudents }
)(ViewStudents);
