import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteCourse } from "../../actions/courseActions";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

class Courses extends Component {
  onDeleteClick(id) {
    this.props.deleteCourse(id);
  }

  onViewStudentsClick(id) {
    this.props.displayEnrolledStudents(id);
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      // this.loadCommentsFromServer();
    });
  };

  render() {
    if (this.props.courses != null && this.props.courses != undefined) {
      const courses = this.props.courses.map(edu => (
        <tr key={edu._id}>
          <td>{edu.courseid}</td>
          <td>{edu.coursename}</td>
          <td>{edu.coursedept}</td>
          <td>{edu.coursedescription}</td>
          <td>{edu.courseroom}</td>
          <td>{edu.coursecapacity}</td>
          <td>{edu.waitlistcapacity}</td>
          <td>{edu.courseterm}</td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, edu._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
          <td>
            <div className="btn-group mb-2" role="group">
              <Link to={`/view-students/${edu.uid}`} className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" />
                View Students
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
                <th>Description</th>
                <th>CourseRoom</th>
                <th>Capacity</th>
                <th>Waitlist</th>
                <th>Term</th>
                <th />
              </tr>
              {courses}
            </thead>
          </table>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={1} //{this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      );
    }
  }
}

Courses.propTypes = {
  deleteCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCourse }
)(Courses);
