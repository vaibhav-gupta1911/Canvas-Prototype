import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfessorAssignment } from "../../actions/assignmentActions";
import Spinner from "../common/Spinner";
import Courses from "./SubViewProfessorAssignmentsList";
import PDFViewer from "../PDFViewer/PDFViewer";
import PDFJSBackend from "../../backend/pdfjs";

class ViewProfessorAssignmentsList extends Component {
  componentDidMount() {
    this.props.getProfessorAssignment(this.props.match.params.item);
  }
  render() {
    const { assignments } = this.props.assignments;
    let dashboardContent;

    if (assignments === null) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(assignments).length > 0) {
        dashboardContent = (
          <div>
            <div>
              <Link to="/dashboard" className="btn btn-light">
                Dashboard
              </Link>
            </div>
            <br />
            <div>
              <Courses courses={assignments} />
              {/* <PDFViewer 
               backend={PDFJSBackend}
               src='E:/273_All/FileServer/1552854716865.pdf'
          /> */}
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <Link to="/dashboard" className="btn btn-light">
              Dashboard
            </Link>
            <p>You have no assigments yet.</p>
          </div>
        );
      }
    }
    return (
      <div className="classitem">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Assigments</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewProfessorAssignmentsList.propTypes = {
  getProfessorAssignment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  assignments: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  assignments: state.assignments
});

export default connect(
  mapStateToProps,
  { getProfessorAssignment }
)(ViewProfessorAssignmentsList);
