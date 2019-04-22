import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createCourse } from "../../actions/courseActions";

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseid: "",
      coursename: "",
      coursedept: "",
      coursedescription: "",
      courseroom: "",
      coursecapacity: "",
      waitlistcapacity: "",
      courseterm: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onCheck = this.onCheck.bind(this);
  }

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
      coursedept: this.state.coursedept,
      coursedescription: this.state.coursedescription,
      courseroom: this.state.courseroom,
      coursecapacity: this.state.coursecapacity,
      waitlistcapacity: this.state.waitlistcapacity,
      courseterm: this.state.courseterm
    };

    this.props.createCourse(courseData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onCheck(e) {
  //   this.setState({
  //     disabled: !this.state.disabled,
  //     current: !this.state.current
  //   });
  // }

  render() {
    const { errors } = this.state;

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
              {/* <p className="lead text-center">Create a course.</p> */}
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* CourseId"
                  name="courseid"
                  value={this.state.courseid}
                  onChange={this.onChange}
                  error={errors.courseid}
                  required="true"
                  //pattern="^[A-Za-z0-9]"
                  info="*alphanumeric only"
                />
                <TextFieldGroup
                  placeholder="* Coursename"
                  name="coursename"
                  value={this.state.coursename}
                  onChange={this.onChange}
                  error={errors.coursename}
                  required="true"
                />
                <TextFieldGroup
                  placeholder="* coursedept"
                  name="coursedept"
                  value={this.state.coursedept}
                  onChange={this.onChange}
                  error={errors.coursedept}
                  required="true"
                />
                <TextFieldGroup
                  placeholder="* coursedescription"
                  name="coursedescription"
                  value={this.state.coursedescription}
                  onChange={this.onChange}
                  error={errors.coursedescription}
                  required="true"
                />
                <TextFieldGroup
                  placeholder="* courseroom"
                  name="courseroom"
                  value={this.state.courseroom}
                  onChange={this.onChange}
                  error={errors.courseroom}
                  required="true"
                />
                <TextFieldGroup
                  placeholder="* coursecapacity"
                  name="coursecapacity"
                  value={this.state.coursecapacity}
                  onChange={this.onChange}
                  error={errors.coursecapacity}
                  required="true"
                  type="number"
                  info="numeric only"
                  max="200"
                  min="0"
                />
                <TextFieldGroup
                  placeholder="* waitlistcapacity"
                  name="waitlistcapacity"
                  value={this.state.waitlistcapacity}
                  onChange={this.onChange}
                  error={errors.waitlistcapacity}
                  type="number"
                  info="numeric only"
                />
                <TextFieldGroup
                  placeholder="* courseterm"
                  name="courseterm"
                  value={this.state.courseterm}
                  onChange={this.onChange}
                  error={errors.courseterm}
                  required="true"
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

CreateCourse.propTypes = {
  createCourse: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createCourse }
)(withRouter(CreateCourse));
