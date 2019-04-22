import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getSubmittedAssigmentsByid,
  updategrade
} from "../../actions/assignmentActions";
import { submitAssignments } from "../../actions/assignmentActions";

class GradeAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      file: null,
      item: [],
      details: "",
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onChange2 = this.onChange2.bind(this);
  }

  onDeleteClick(id) {
    const x = {
      id: id,
      grade: this.state.details
    };
    this.props.updategrade(x, this.props.history);
  }

  componentDidMount() {
    this.props.getSubmittedAssigmentsByid(this.props.match.params.item);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      //this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const x = new FormData();
    x.append("myImage", this.state.file);

    const { assignments } = this.props.assignments;

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        user: this.props.auth.user.id,
        aid: assignments._id,
        details: this.state.details,
        coid: assignments.courseuid
      }
    };

    this.props.submitAssignments(
      x,
      config,
      this.state.item,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChange2(e) {
    this.setState({ file: e.target.files[0] });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
    const { assignments } = this.props.assignments;

    if (Object.keys(assignments).length > 0) {
    } else {
      return <div />;
    }
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Dashboard
              </Link>
              <h1 className="display-4 text-center">Submit Assigment</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <h6>Student</h6>
                <TextFieldGroup
                  placeholder="* Name"
                  name="school"
                  value={assignments[0].user.name}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <h6>Email</h6>
                <TextAreaFieldGroup
                  placeholder="Assignments Details"
                  name="description"
                  value={assignments[0].user.email}
                  onChange={this.onChange}
                  error={errors.details}
                  // info="Write details about the Assignments"
                />
                <h6>Submission Details</h6>
                <TextAreaFieldGroup
                  placeholder="Submission Details"
                  name="description"
                  value={assignments[0].submissiondetails}
                  onChange={this.onChange}
                  error={errors.details}
                  // info="Write details about the Assignments"
                />
                <h6>Submitted Docs</h6>
                <ul>
                  <a href="/Test.pdf">{assignments[0].submissionfilename}</a>
                </ul>

                <div className="divsideblue">
                  <div>
                    <br />
                    <h6>Grade</h6>
                    <TextAreaFieldGroup
                      placeholder="GRADE"
                      name="details"
                      type="number"
                      value={this.state.details}
                      onChange={this.onChange}
                      error={errors.details}
                      isRequired="true"
                      // info="Write details about the Assignments"
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-info btn-block mt-4"
                    onClick={this.onDeleteClick.bind(this, assignments[0]._id)}
                  >
                    Submit
                  </button>
                </div>

                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GradeAssignment.propTypes = {
  updategrade: PropTypes.func.isRequired,
  submitAssignments: PropTypes.func.isRequired,
  getSubmittedAssigmentsByid: PropTypes.func.isRequired,
  assignments: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,

  assignments: state.assignments,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getSubmittedAssigmentsByid, updategrade, submitAssignments }
)(withRouter(GradeAssignment));
