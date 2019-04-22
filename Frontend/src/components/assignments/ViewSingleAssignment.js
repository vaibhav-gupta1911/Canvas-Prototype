import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSingleAssignment } from "../../actions/assignmentActions";
import { submitAssignments } from "../../actions/assignmentActions";

class ViewSingleAssignment extends Component {
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

  componentDidMount() {
    this.props.getSingleAssignment(this.props.match.params.id);
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
                <h6>Title</h6>
                <TextFieldGroup
                  placeholder="* Title"
                  name="school"
                  value={assignments.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <h6>Submission Date</h6>
                <TextFieldGroup
                  name="to"
                  //type="date"
                  value={assignments.upto}
                  onChange={this.onChange}
                  error={errors.upto}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <h6>Assignments Details</h6>
                <TextAreaFieldGroup
                  placeholder="Assignments Details"
                  name="description"
                  value={assignments.details}
                  onChange={this.onChange}
                  error={errors.details}
                  // info="Write details about the Assignments"
                />
                <h6>Assignments Files</h6>
                <ul>
                  <li>{assignments.filepath}</li>
                </ul>
                <div className="divsideblue">
                  <h3>Upload Assigment Doc</h3>
                  <input type="file" name="myImage" onChange={this.onChange2} />
                  <div>
                    <br />
                    <h6>Sumission Comments</h6>
                    <TextAreaFieldGroup
                      placeholder="Submission Comments"
                      name="details"
                      value={this.state.details}
                      onChange={this.onChange}
                      error={errors.details}
                      // info="Write details about the Assignments"
                    />
                  </div>
                </div>

                <div>
                  <button className="btn btn-info btn-block mt-4" type="submit">
                    Upload
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

ViewSingleAssignment.propTypes = {
  submitAssignments: PropTypes.func.isRequired,
  getSingleAssignment: PropTypes.func.isRequired,
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
  { getSingleAssignment, submitAssignments }
)(withRouter(ViewSingleAssignment));
