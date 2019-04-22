import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { displayfileupload } from "../../actions/uploadActions";
import Spinner from "../common/Spinner";
import Courses from "./SubViewUploadedFilesStudent";
import PDFViewer from "../PDFViewer/PDFViewer";
import PDFJSBackend from "../../backend/pdfjs";

class ViewUploadedFilesStudent extends Component {
  componentDidMount() {
    this.props.displayfileupload({
      id: this.props.auth.user.id,
      uid: this.props.match.params.uid
    });
  }
  render() {
    const { notes } = this.props.notes;
    let dashboardContent;

    if (notes === null) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(notes).length > 0) {
        dashboardContent = (
          <div>
            <div>
              <Link to="/dashboard" className="btn btn-light">
                Dashboard
              </Link>
            </div>
            <br />
            <div>
              <Courses courses={notes} />
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
            <p>You have no files yet.</p>
          
          </div>
        );
      }
    }
    return (
      <div className="classitem">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Courses</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewUploadedFilesStudent.propTypes = {
  displayfileupload: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  notes: state.notes
});

export default connect(
  mapStateToProps,
  { displayfileupload }
)(ViewUploadedFilesStudent);
