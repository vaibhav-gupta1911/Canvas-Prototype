import axios from "axios";

import {
  GET_STUDENTS,
  DROP_STUDENT,
  FILE_UPLOADED,
  ASSIGNMENT_UPLOADED,
  GET_ERRORS
} from "./types";

export const displayEnrolledStudents = uid => dispatch => {
  // dispatch(setProfileLoading());
  const params = {
    _uid: uid
  };
  axios
    .get("/api/users/enrolledstudents", { params })
    .then(res =>
      dispatch({
        type: GET_STUDENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STUDENTS,
        payload: null
      })
    );
};

export const dropStudent = (eduData, history) => dispatch => {
  axios
    .post("/api/users/dropstudent", eduData)
    .then(res =>
      dispatch({
        type: DROP_STUDENT,
        payload: eduData.soid
      })
    ) //res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        // type: GET_ERRORS,
        // payload: err.response.data
      })
    );
};

export const addAssignments = (formData, config, data, history) => dispatch => {
  //uploadFiles
  axios
    .post("/api/assignment/createassignment", formData, config, data)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
