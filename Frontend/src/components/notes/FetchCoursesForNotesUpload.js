import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { uploadFiles } from "../../actions/uploadActions";
import { Link } from "react-router-dom";
import axios from "axios";

class FetchCoursesForNotesUpload extends Component {
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

  onDeleteClicke(uid) {
    this.setState({});
    //  this.props.deleteCourse(id);
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
          {/* <td>
            <button
              onClick={this.onDeleteClick.bind(this, edu._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td> */}
          <td>
            <div className="btn-group mb-2" role="group">
              <Link to={`/viewuploads/${edu.uid}`} className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" />
                View Uploads
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
          <h4 className="mb-4">Your Courses</h4>
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
            <form className="formHome" onSubmit={this.onFormSubmit}>
              <h1>File Upload</h1>
              <input type="file" name="myImage" onChange={this.onChange} />
              <button className="btn btn-danger" type="submit">
                Upload
              </button>
            </form>

            {/* {/* <h1>File Upload</h1>
                <input type="file" name="myImage" onChange= {this.onChange} />
                {/* <button type="submit">Upload</button> */}
          </div>
        </div>
      );
    }
  }
}

FetchCoursesForNotesUpload.propTypes = {
  auth: PropTypes.object.isRequired,
  uploadFiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { uploadFiles }
)(FetchCoursesForNotesUpload);
