import axios from "axios";

import { GET_ERRORS, GET_ASSIGNMENT } from "./types";

export const getStudentssignments = coid => dispatch => {
  //dispatch(setProfileLoading());
  const params = {
    coid: coid
  };
  axios
    .get("/api/assignment/studentassignments", { params })
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: {}
      })
    );
};

export const getProfessorAssignment = coid => dispatch => {
  //dispatch(setProfileLoading());
  const params = {
    coid: coid
  };
  axios
    .get("/api/assignment/studentassignments", { params })
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: {}
      })
    );
};

export const getSingleAssignment = _id => dispatch => {
  //dispatch(setProfileLoading());
  const params = {
    _id: _id
  };
  axios
    .get("/api/assignment/studentassignment", { params })
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: {}
      })
    );
};

export const getAllSubmittedAssigments = _id => dispatch => {
  //dispatch(setProfileLoading());
  const params = {
    coid: _id
  };
  axios
    .get("/api/assignment/allsubassigments", { params })
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: {}
      })
    );
};

export const getSubmittedAssigmentsByid = _id => dispatch => {
  //dispatch(setProfileLoading());
  const params = {
    coid: _id
  };
  axios
    .get("/api/assignment/gradingassignment", { params })
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: {}
      })
    );
};

export const getProfessorAssignmentbyid = _id => dispatch => {
  //dispatch(setProfileLoading());
  const params = {
    _id: _id
  };
  axios
    .get("/api/assignment/professorassignments", { params })
    .then(res =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSIGNMENT,
        payload: {}
      })
    );
};

export const submitAssignments = (
  formData,
  config,
  data,
  history
) => dispatch => {
  //uploadFiles
  axios
    .post("/api/assignment/submitassignment", formData, config, data)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updategrade = (profileData, history) => dispatch => {
  axios
    .post("/api/assignment/gradeassignment", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
