import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileActions = ({ authjob }) => {
  return (
    <div className="dashboardMenu">
      <div className="btn-group mb-2" role="group">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
      </div>
      <div className="btn-group mb-2" role="group">
        <Link to="/profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> View Profile
        </Link>
      </div>
      <div
        className="btn-group mb-2"
        role="group"
        style={authjob != "Faculty" ? {} : { display: "none" }}
      >
        <Link to="/view-enrolled" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Enrolled Courses
        </Link>
      </div>
      <div
        className="btn-group mb-2"
        role="group"
        style={authjob === "Faculty" ? {} : { display: "none" }}
      >
        <Link to="/create-course" className="btn btn-light">
          <i className="fas fa-book text-info mr-1" />
          Create Course
        </Link>
      </div>
      <div className="btn-group mb-2" role="group">
        <Link to="/feed" className="btn btn-light">
          <i className="fas fa-book text-info mr-1" />
          Chat
        </Link>
      </div>
      <div
        className="btn-group mb-2"
        role="group"
        style={authjob === "Faculty" ? {} : { display: "none" }}
      >
        <Link to="/view-course" className="btn btn-light">
          <i className="fas fa-book text-info mr-1" />
          View Courses
        </Link>
      </div>
      <div
        className="btn-group mb-2"
        role="group"
        style={authjob != "Faculty" ? {} : { display: "none" }}
      >
        <Link to="/enroll-course" className="btn btn-light">
          <i className="fas fa-book text-info mr-1" />
          Enroll Course
        </Link>
      </div>

      <div
        style={authjob === "Faculty" ? {} : { display: "none" }}
        className="btn-group mb-2"
        role="group"
      >
        <Link to="/uploadnotes" className="btn btn-light">
          <i className="fas fa-book text-info mr-1" />
          Upload Files
        </Link>
      </div>
      <div
        style={authjob != "Faculty" ? {} : { display: "none" }}
        className="btn-group mb-2"
        role="group"
      >
        <Link to="/coursedashboard" className="btn btn-light">
          <i className="fas fa-book text-info mr-1" />
          Student Portfolio
        </Link>
      </div>
      <div
        style={authjob === "Faculty" ? {} : { display: "none" }}
        className="btn-group mb-2"
        role="group"
      >
        <Link to="/facultydashboard" className="btn btn-light">
          <i className="fas fa-book text-info mr-1" />
          Faculty Portfolio
        </Link>
      </div>
    </div>
  );
};

// ProfileActions.propTypes = {
//   authjob: PropTypes.string.isRequired
// };

// ProfileActions.defaultProps = {};

export default ProfileActions;
