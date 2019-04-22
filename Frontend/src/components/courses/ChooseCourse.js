import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentCourse } from "../../actions/courseActions";
import Spinner from "../common/Spinner";
import Courses from "../dashboard/CoursesEnroll";

class ChooseCourse extends Component {
  componentDidMount() {
    if (this.props.id != "" && this.props.id != undefined) {
      //this.props.getCurrentCourse(this.props.id);
      //this.props.getCurrentCourse(this.props.auth.user.id);
    }
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
            <p className="lead text-muted" />
            <Courses courses={courses} />
          </div>
        );
      } else {
        dashboardContent = <div />;
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

ChooseCourse.propTypes = {
  getCurrentCourse: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  courses: state.courses
});

export default connect(
  mapStateToProps,
  { getCurrentCourse }
)(ChooseCourse);
