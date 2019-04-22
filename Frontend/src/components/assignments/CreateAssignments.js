import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addAssignments } from "../../actions/studentActions";

class CreateAssignments extends Component {
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
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onChange2 = this.onChange2.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const x = new FormData();
    x.append("myImage", this.state.file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        user: this.props.auth.user.id,
        title: this.state.school,
        upto: this.state.to,
        details: this.state.description,
        id: this.props.match.params.item
      }
    };

    this.props.addAssignments(x, config, this.state.item, this.props.history);
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

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Assigment</h1>
              {/* <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p> */}
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Title"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.title}
                  required="true"
                />
                <h6>Submit By</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.upto}
                  disabled={this.state.disabled ? "disabled" : ""}
                  required="true"
                />
                <TextAreaFieldGroup
                  placeholder="Assignments Details"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.details}
                  info="Write details about the Assignments"
                  required="true"
                />
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange={this.onChange2} />
                <button className="btn btn-info btn-block mt-4" type="submit">
                  Upload
                </button>
                <br />
                {/* <div>
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateAssignments.propTypes = {
  addAssignments: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addAssignments }
)(withRouter(CreateAssignments));
