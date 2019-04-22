import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteCourse } from "../../actions/courseActions";
import { Link } from "react-router-dom";

class SubViewProfessorAssignmentsList extends Component {
  onDeleteClick(id) {
    this.props.deleteCourse(id);
  }

  onViewStudentsClick(id) {
    this.props.displayEnrolledStudents(id);
  }

  render() {
    if (this.props.courses) {
      const courses = this.props.courses.map(edu => (
        <tr key={edu._id}>
          <td>{edu.title}</td>
          <td>{edu.upto}</td>

          <td>
            <div className="btn-group mb-2" role="group">
              <Link
                to={`/viewsubassignment/${edu._id}`}
                className="btn btn-green"
              >
                <i className="fas fa-user-circle text-info mr-1" />
                View Submissions
              </Link>
            </div>
            {/* 
            <button
              onClick={this.onViewStudentsClick.bind(this, edu._id)}
              className="btn btn-danger"
            >
              View Students
            </button> */}
          </td>
        </tr>
      ));
      return (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Submission Date</th>
                <th />
                <th />
              </tr>
              {courses}
            </thead>
          </table>
        </div>
      );
    }
  }
}

SubViewProfessorAssignmentsList.propTypes = {
  deleteCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCourse }
)(SubViewProfessorAssignmentsList);
