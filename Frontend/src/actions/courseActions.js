import axios from "axios";

import {
  GET_COURSES,
  COURSES_LOADING,
  GET_ERRORS,
  GET_COURSES_DELETED
} from "./types";

// Delete Experience
export const deleteCourse = id => dispatch => {
  axios
    .delete(`/api/course/course/${id}`)
    .then(res =>
      dispatch({
        type: GET_COURSES_DELETED,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COURSES_DELETED,
        payload: id
      })
    );
};

export const dropCourse = id => dispatch => {
  const data1 = {
    id: id
  };
  axios
    .post("/api/course/drop", data1)
    .then() //res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// export const EnrollCourse = id => dispatch => {
//   axios
//     .delete(`/api/course/course/${id}`)
//     .then(res =>
//       dispatch({
//         type: GET_COURSES_DELETED,
//         payload: id
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_COURSES_DELETED,
//         payload: id
//       })
//     );
// };

export const enrollCourse = id => dispatch => {
  const data1 = {
    id: id
  };
  axios
    .post("/api/course/enroll", data1)
    .then() //res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getCurrentCourse = id => dispatch => {
  dispatch(setProfileLoading());
  const params = {
    _id: id
  };
  axios
    .get("/api/course/course", { params })
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COURSES,
        payload: {}
      })
    );
};

export const getStudentCourses = id => dispatch => {
  dispatch(setProfileLoading());
  const params = {
    _id: id
  };
  axios
    .get("/api/course/enroll", { params })
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COURSES,
        payload: {}
      })
    );
};

export const getCoursesAsSearched = (val, sel) => dispatch => {
  dispatch(setProfileLoading());
  const params = {
    value: val,
    selection: sel
  };
  axios
    .get("/api/course/addcourse", { params })
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COURSES,
        payload: {}
      })
    );
};

export const createCourse = (courseData, history) => dispatch => {
  axios
    .post("/api/course/course", courseData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add experience
export const addCourse = (expData, history) => dispatch => {
  axios
    .post("/api/profile/course", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: COURSES_LOADING
  };
};
