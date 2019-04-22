import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createCourse } from "../../actions/courseActions";
import SelectListGroup from "../common/SelectListGroup";
import { getCurrentCourse } from "../../actions/courseActions";

class EnrollCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseid: "",
      coursename: "",
      courseterm: "",
      value: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onCheck = this.onCheck.bind(this);
  }

  // componentDidMount() {
  //   this.props.getCurrentCourse(this.props.auth.user.id);
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const courseData = {
      courseid: this.state.courseid,
      coursename: this.state.coursename,
      courseterm: this.state.courseterm
    };

    this.props.createCourse(courseData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;

    const options = [
      { label: "* Select Search", value: 0 },
      { label: "ALL", value: "ALL" },
      { label: "Id", value: "Id" },
      { label: "Name", value: "Name" },
      { label: "Term", value: "Term" }
    ];

    return (
      <div className="create-course">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Dashboard
              </Link>
              <Link to="/view-course" className="btn btn-light">
                View Courses
              </Link>
              <h1 className="display-4 text-center">Create Course</h1>
              <p className="lead text-center">Create a course.</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={options}
                  error={errors.gender}
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
    );
  }
}

EnrollCourse.propTypes = {
  createCourse: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createCourse, getCurrentCourse }
)(withRouter(EnrollCourse));
