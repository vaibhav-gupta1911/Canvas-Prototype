import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileAction";
import { getCurrentCourse } from "../../actions/courseActions";
import Courses from "../dashboard/Courses";
import EnrollCourse from "./EnrollCourse";
import ChooseCourse from "./ChooseCourse";
import SelectListGroup from "../common/SelectListGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { getCoursesAsSearched } from "../../actions/courseActions";

class EnrollDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: "",
      value: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onCheck = this.onCheck.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const courseSearch = {
      selection: this.state.selection,
      value: this.state.value
    };

    //this.props.getCurrentCourse(this.props.auth.user.id);

    this.props.getCoursesAsSearched(this.state.value, this.state.selection);

    //this.props.createCourse(courseData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { value } = this.state;

    const options = [
      { label: "* Select Search", value: 0 },
      { label: "Id", value: "Id" },
      { label: "Name", value: "Name" },
      { label: "Term", value: "Term" },
      { label: "ALL", value: "ALL" }
    ];

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Enroll Course</h1>
              <div>
                {/* <EnrollCourse /> */}
                <div>
                  <div className="create-course">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-8 m-auto">
                          <Link to="/dashboard" className="btn btn-light">
                            Dashboard
                          </Link>

                          <p className="lead text-center">Add a course.</p>
                          <small className="d-block pb-3">
                            * = required fields
                          </small>
                          <form onSubmit={this.onSubmit}>
                            <SelectListGroup
                              placeholder="selection"
                              name="selection"
                              value={this.state.selection}
                              onChange={this.onChange}
                              options={options}
                              error={errors.selection}
                              info="Search Courses By selecting desired option"
                            />
                            <TextFieldGroup
                              placeholder="* Value"
                              name="value"
                              value={this.state.value}
                              onChange={this.onChange}
                              error={errors.value}
                            />
                            <input
                              type="submit"
                              value="Submit"
                              className="btn btn-info btn-block mt-4"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ChooseCourse id={value} />
                {/* <Courses courses={courses} /> */}
                <div style={{ marginBottom: "60px" }} />
              </div>
              ;
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EnrollDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getCurrentCourse: PropTypes.func.isRequired,
  getCoursesAsSearched: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  courses: state.courses,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getCurrentCourse, getCoursesAsSearched }
)(EnrollDashboard);
