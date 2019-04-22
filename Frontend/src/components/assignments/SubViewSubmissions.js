import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteCourse } from "../../actions/courseActions";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class SubViewSubmissions extends Component {
  onDeleteClick(id) {
    //this.props.gradeAssi(gnmentid);
  }

  onViewStudentsClick(id) {
    this.props.displayEnrolledStudents(id);
  }

  render() {
    if (this.props.courses) {
      const courses = this.props.courses.map(edu => (
        <tr key={edu._id}>
          <td>{edu.user.name}</td>
          <td>{edu.user.email}</td>
          <td>{edu.submissionDate}</td>
          <td>
            <TextAreaFieldGroup
              placeholder="Assignment Details"
              name="description"
              value={edu.submissiondetails}
            />
          </td>
          <td>
            <p>
              <a href="/Test.pdf">{edu.submissionfilename}</a>
            </p>
          </td>
          <td>
            <TextFieldGroup
              name="test"
              type="text"
              value={edu.grade}
              // onChange={this.onChange}
            />
          </td>
          <td>
            <Link
              to={`/gradeassignment/${edu._id}`}
              className="btn btn-lg btn-info"
            >
              Grade Assignment
            </Link>
          </td>
        </tr>
      ));
      return (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Submission Date</th>
                <th>Details</th>

                <th>File</th>
                <th>Current Grade</th>
                <th>Grade</th>
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

SubViewSubmissions.propTypes = {
  deleteCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCourse }
)(SubViewSubmissions);
