import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { dropStudent } from "../../actions/studentActions";

class StudentCourses extends Component {
  onDeleteClick(id) {
    const data = {
      soid: id,
      coid: this.props.coid
    };
    this.props.dropStudent(data);
  }

  render() {
    if (this.props.students != null && this.props.students != undefined) {
      const students = this.props.students.map(edu => (
        <tr key={edu._id}>
          <td>{edu.name}</td>
          <td>{edu.email}</td>
          <td>
            <button
              //   style={
              //     edu.enrolledstatus === "Dropped" ? { display: "none" } : {}
              //   }
              onClick={this.onDeleteClick.bind(this, edu._id)}
              className="btn btn-danger"
            >
              Drop
            </button>
          </td>
        </tr>
      ));

      return (
        <div>
          <h4 className="mb-4">Enrolled Students</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th />
              </tr>
              {students}
            </thead>
          </table>
        </div>
      );
    }
  }
}

StudentCourses.propTypes = {
  dropStudent: PropTypes.func.isRequired
};

export default connect(
  null,
  { dropStudent }
)(StudentCourses);
