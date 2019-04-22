import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { uploadFiles } from "../../actions/uploadActions";
import { Link } from "react-router-dom";
import axios from "axios";

class GetCoursesDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      item: []
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const x = new FormData();
    x.append("myImage", this.state.file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        mydata: this.state.item,
        user: this.props.auth.user.id
      }
    };

    this.props.uploadFiles(x, config, this.state.item);
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
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

  onViewStudentsClick(id) {
    this.props.displayEnrolledStudents(id);
  }

  render() {
    if (this.props.courses) {
      const courses = this.props.courses.map(edu => (
        <tr key={edu._id}>
          <td>{edu.courseid}</td>
          <td>{edu.coursename}</td>
          <td>{edu.coursedept}</td>
          <td>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                name="current"
                //value={this.state.current}
                //checked={this.state.current}
                //onChange={this.onCheck}
                onChange={this.onDeleteClick.bind(this, edu.uid)}
                id="current"
              />
              <label htmlFor="current" className="form-check-label" />
            </div>
          </td>
        </tr>
      ));
      return (
        <div>
          <h4 className="mb-4">Your Courses</h4>
          <h6 className="mb-4">
            ** Please select atlest one Course for further action.
          </h6>
          <table className="table">
            <thead>
              <tr>
                <th>CourseId</th>
                <th>CourseName</th>
                <th>CourseDept</th>
                <th />
              </tr>
              {courses}
            </thead>
          </table>
          <div>
            <div>
              <div className="btn-group mb-2" role="group">
                <Link
                  //<Link to={`/view-students/${edu.uid}`}
                  // style={authjob === "Faculty" ? {} : { display: "none" }}
                  to={
                    this.state.item.length > 0
                      ? `/createassignment/${this.state.item}`
                      : "facultydashboard"
                  } //"/createassignment"
                  className="btn btn-light"
                >
                  <i className="fas fa-book text-info mr-1" />
                  Create Assignment
                </Link>
              </div>
              <br />
              <div className="btn-group mb-2" role="group">
                <Link
                  to={
                    this.state.item.length > 0
                      ? `/viewprofassignment/${this.state.item}`
                      : "/facultydashboard"
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
                  to="/facultydashboard"
                  className="btn btn-light"
                >
                  <i className="fas fa-book text-info mr-1" />
                  Create Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

GetCoursesDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  uploadFiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { uploadFiles }
)(GetCoursesDashboard);
