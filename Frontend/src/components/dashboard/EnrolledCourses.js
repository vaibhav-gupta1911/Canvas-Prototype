import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { dropCourse } from "../../actions/courseActions";
//import { DragDropContext } from "react-beautiful-dnd";

// ES6
//import Draggable from "react-draggable"; // The default
//import { DraggableCore } from "react-draggable"; // <DraggableCore>
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time

class EnrolledCourses extends Component {
  onDeleteClick(id) {
    this.props.dropCourse(id);
  }

  render() {
    if (this.props.courses != null && this.props.courses != undefined) {
      const courses = this.props.courses.map(edu => (
        // <tr key={edu.data1[0]._id}>
        //   <td>{edu.data1[0].courseid}</td>
        //   <td>{edu.data1[0].coursename}</td>
        //   <td>{edu.data1[0].coursedept}</td>
        //   <td>{edu.data1[0].coursedescription}</td>
        //   <td>{edu.data1[0].courseroom}</td>
        //   <td>{edu.data1[0].coursecapacity}</td>
        //   <td>{edu.data1[0].waitlistcapacity}</td>
        //   <td>{edu.waitlistStatus}</td>
        //   <td>{edu.enrolledstatus}</td>
        //   <td>{edu.data1[0].courseterm}</td>
        //   <td>
        //     <button
        //       onClick={this.onDeleteClick.bind(this, edu._id)}
        //       className="btn btn-danger"
        //     >
        //       Drop
        //     </button>
        //   </td>
        // </tr>

        <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[25, 25]}
          scale={1}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
        >
          <div className="card col-sm-3">
            <div className="handle">
              <p className="btn btn-danger">DRAGGER</p>
            </div>
            <div key={edu.data1[0]._id}>
              <div className="cardheader">
                <div className="col-sm-12">
                  ID:&nbsp;{edu.data1[0].courseid}
                </div>
                <div className="col-sm-12">
                  Name: &nbsp;{edu.data1[0].coursename}
                </div>
              </div>
              <div className="cardbody">
                <div className="col-sm-12">
                  Dept:&nbsp;{edu.data1[0].coursedept}
                </div>
                <div className="col-sm-12">
                  Desc:&nbsp; {edu.data1[0].coursedescription}
                </div>
                <div className="col-sm-12">
                  Room: &nbsp;{edu.data1[0].courseroom}
                </div>
                <div className="col-sm-12">
                  Capacity: &nbsp;{edu.data1[0].coursecapacity}
                </div>
                <div className="col-sm-12">
                  Waitlist: &nbsp;{edu.data1[0].waitlistcapacity}
                </div>
                <div className="col-sm-12">
                  WaitStatus: &nbsp;{edu.waitlistStatus}
                </div>
                <div className="col-sm-12">
                  EnrollStatus:&nbsp;{edu.enrolledstatus}
                </div>
                <div className="col-sm-12">
                  Term:&nbsp;{edu.data1[0].courseterm}
                </div>
              </div>

              <div>
                <button
                  onClick={this.onDeleteClick.bind(this, edu._id)}
                  className="btn btn-danger"
                >
                  Drop
                </button>
              </div>
            </div>
            {/* </div>

          <div> */}

            {/* <div>This readme is really dragging on...</div> */}
            <div className="cardcontainer">{courses}</div>
          </div>
        </Draggable>
      ));

      return (
        <div>
          <h4 className="mb-4">Your Courses</h4>
          {/* <table className="table">
            <thead>
              <tr>
                <th>CourseId</th>
                <th>CourseName</th>
                <th>CourseDept</th>
                <th>Description</th>
                <th>CourseRoom</th>
                <th>Capacity</th>
                <th>Waitlist</th>
                <th>WaitlistStatus</th>
                <th>EnrolledStatus</th>
                <th>Term</th>
                <th />
              </tr>
              {courses}
            </thead>
          </table> */}
          <div className="cardcontainer">{courses}</div>;
        </div>
      );
    }
  }
}

EnrolledCourses.propTypes = {
  dropCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { dropCourse }
)(EnrolledCourses);
