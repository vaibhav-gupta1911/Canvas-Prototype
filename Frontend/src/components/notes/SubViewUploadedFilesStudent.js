import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteCourse } from "../../actions/courseActions";
import { Link } from "react-router-dom";

class SubViewUploadedFilesStudent extends Component {
//         constructor(props) {
//         super(props);
//         this.state ={
//             file: null,
//         };
//        this.onFormSubmit = this.onFormSubmit.bind(this);
//         this.onChange = this.onChange.bind(this);
//     }

//  displayFile(id) {
//     this.props.displayEnrolledStudents(id);
//   }

// function readSingleFile(e) {
//   var file = "E:\273_All\data.txt";//e.target.files[0];
// //   if (!file) {
// //     return;
// //   }
//   var reader = new FileReader();
//   reader.onload = function(e) {
//     var contents = e.target.result;
//     displayContents(contents);
//   };
//   reader.readAsText(file);
// }
// function displayContents(contents) {
//   var x = contents;
// }



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
          <td>{edu.name}</td>
          <td>{edu.date}</td>
          {/* <td>{edu.coursename}</td>
          <td>{edu.coursedept}</td>
          <td>{edu.coursedescription}</td>
          <td>{edu.courseroom}</td>
          <td>{edu.coursecapacity}</td>
          <td>{edu.waitlistcapacity}</td>
          <td>{edu.courseterm}</td> */}
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
              <Link to={`/view-students/${edu.uid}`} className="btn btn-green">
                <i className="fas fa-user-circle text-info mr-1" />
                View File
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
          <h4 className="mb-4">Files and Notes</h4>
          <table className="table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded Date</th>
                <th>View Click</th>
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

SubViewUploadedFilesStudent.propTypes = {
  deleteCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCourse }
)(SubViewUploadedFilesStudent);
