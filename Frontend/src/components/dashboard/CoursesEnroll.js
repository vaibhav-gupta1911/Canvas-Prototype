import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { enrollCourse } from "../../actions/courseActions";
import { MDBBtn, MDBDataTable, MDBTable, MDBTableHead } from "mdbreact";

class CoursesEnroll extends Component {
  onDeleteClick(id) {
    this.props.enrollCourse(id);
  }
  data = {
    columns: [
      {
        label: "CourseId",
        field: "CourseId",
        sort: "asc",
        width: 150
      },
      {
        label: "CourseName",
        field: "CourseName",
        sort: "asc",
        width: 270
      },
      {
        label: "CourseDept",
        field: "CourseDept",
        sort: "asc",
        width: 200
      },
      {
        label: "Description",
        field: "Description",
        sort: "asc",
        width: 100
      },
      {
        label: "CourseRoom",
        field: "CourseRoom",
        sort: "asc",
        width: 150
      },
      {
        label: "Capacity",
        field: "Capacity",
        sort: "asc",
        width: 100
      },
      {
        label: "Waitlist",
        field: "Waitlist",
        sort: "asc",
        width: 100
      },
      {
        label: "Term",
        field: "Term",
        sort: "asc",
        width: 100
      },
      {
        label: "Apply",
        field: "Apply",
        //sort: "asc",
        width: 100
      }
    ],
    rows: [
      // {
      //   CourseId: "Tiger Nixon",
      //   CourseName: "System Architect",
      //   CourseDept: "Edinburgh",
      //   Description: "61",
      //   CourseRoom: "2011/04/25",
      //   Capacity: "$320",
      //   Waitlist: "2011/04/25",
      //   Term: "$320"
      // }
    ]
  };

  render() {
    if (this.props.courses != null && this.props.courses != undefined) {
      this.data.rows = this.props.courses.map(
        edu =>
          // <tr key={edu._id}>
          ({
            CourseId: edu.courseid,
            CourseName: edu.coursename,
            CourseDept: edu.coursedept,
            Description: edu.coursedescription,
            CourseRoom: edu.courseroom,
            Capacity: edu.coursecapacity,
            Waitlist: edu.waitlistcapacity,
            Term: edu.waitlistcapacity,
            handle: (
              <MDBBtn
                className="btn btn-danger"
                onClick={this.onDeleteClick.bind(this, edu.uid)}
                color="purple"
                size="sm"
              >
                Apply
              </MDBBtn>
            )
          })

        //  <td>
        //       <button
        //         onClick={this.onDeleteClick.bind(this, edu.uid)}
        //         className="btn btn-danger"
        //       >
        //         Apply
        //       </button>
        //     </td>
      );
      return (
        <div>
          <h4 className="mb-4">Available Courses</h4>
          <table className="table">
            <thead>
              {/* <tr>
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
              {courses} */}
              <MDBDataTable striped bordered small data={this.data} />;
            </thead>
          </table>
        </div>
      );
    }
  }
}

CoursesEnroll.propTypes = {
  enrollCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { enrollCourse }
)(CoursesEnroll);
