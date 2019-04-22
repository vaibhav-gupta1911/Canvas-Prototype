import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { dropCourse } from "../../actions/courseActions";
import { Link } from "react-router-dom";

class GetCoursesDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      item: []
    };
  }

  onDeleteClick(id) {
    var a = this.state.item;

    if (a.includes(id)) {
      var index = a.indexOf(id);
      if (index !== -1) a.splice(index, 1);
      this.setState({ item: a });
    } else {
      a.push(id);
      this.setState({ item: a });
    }
  }

  render() {
    if (this.props.courses) {
      const courses = this.props.courses.map(edu => (
        <tr key={edu.data1[0]._id}>
          <td>{edu.data1[0].courseid}</td>
          <td>{edu.data1[0].coursename}</td>
          {/* <td>{edu.data1[0].coursedept}</td> */}
          <td>{edu.data1[0].coursedescription}</td>
          <td>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                name="current"
                //value={this.state.current}
                //checked={this.state.current}
                //onChange={this.onCheck}
                onChange={this.onDeleteClick.bind(this, edu.data1[0].uid)}
                id="current"
              />
              <label htmlFor="current" className="form-check-label" />
            </div>
          </td>
        </tr>
      ));

      return (
        <div>
          <div className="card card-body bg mb-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Select Course</th>
                  <th>CourseId</th>
                  <th>CourseName</th>
                  {/* <th>CourseDept</th> */}
                  <th>Description</th>
                </tr>

                {courses}
              </thead>
            </table>
          </div>
          <div>
            <div className="btn-group mb-2" role="group">
              <Link
                // style={authjob === "Faculty" ? {} : { display: "none" }}
                to="/viewuploads"
                className="btn btn-light"
              >
                <i className="fas fa-book text-info mr-1" />
                Show Notes
              </Link>
            </div>
            <br />
            <div className="btn-group mb-2" role="group">
              <Link
                to={
                  this.state.item.length > 0
                    ? `/showassignments/${this.state.item}`
                    : "/coursedashboard"
                } //"/createassignment"
                className="btn btn-light"
              >
                <i className="fas fa-book text-info mr-1" />
                Show Assignments
              </Link>
            </div>
            <br />
            <div className="btn-group mb-2" role="group">
              <Link
                // style={authjob === "Faculty" ? {} : { display: "none" }}
                to="/coursedashboard"
                className="btn btn-light"
              >
                <i className="fas fa-book text-info mr-1" />
                Show Submissions
              </Link>
            </div>
            <br />
            <div className="btn-group mb-2" role="group">
              <Link
                // style={authjob === "Faculty" ? {} : { display: "none" }}
                to="/coursedashboard"
                className="btn btn-light"
              >
                <i className="fas fa-book text-info mr-1" />
                Attempt Quiz
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

GetCoursesDashboard.propTypes = {
  dropCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { dropCourse }
)(GetCoursesDashboard);
