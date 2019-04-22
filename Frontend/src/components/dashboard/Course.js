import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteCourse } from "../../actions/profileAction";

class Course extends Component {
  onDeleteClick(id) {
    this.props.deleteCourse(id);
  }

  render() {
    return (
      <div>
        <h4 className="mb-4">Course Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

Course.propTypes = {
  deleteCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCourse }
)(Course);
