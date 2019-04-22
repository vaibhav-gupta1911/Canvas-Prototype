import React, { Component, createContext, createElement } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import "./Navbar.css";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.fetchCourses - this.fetchCourses.bind(this);
    this.state = {
      profile: false,
      courseList: [
        { name: "Add course", id: "", url: "/addcourse" },
        { name: "Create course", id: "", url: "/createcourse" }
      ]
    };
    if (this.state.role == "student") {
      this.setState({
        courseList: { name: "Add course", id: "", url: "/addcourse" }
      });
    } else {
      this.setState({
        courseList: { name: "Create course", id: "", url: "/createcourse" }
      });

      // courseData.push({ name: "Create course", id: "", url: "/createcourse" });
    }
    this.sidebar = React.createRef();
    this.state.activeState = "";
  }

  componentDidMount() {}

  fetchCourses() {
    let courseData = [];
    let parameters = {};
    let url = "";
    // if (this.cookieObj.role = "faculty") {

    //     parameters = {
    //         facultyId: this.cookieObj.userId
    //     }
    //     url='getCourses'
    // }
    // else{

    //     parameters = {
    //         studentId: this.cookieObj.userId
    //     }
    //     url='studentCourses'
    // }
    axios
      .get("http://localhost:3001/" + url, {
        params: parameters
      })
      .then(
        response => {
          let courses = [];
          courses = response.data;

          courses.forEach(function(entry) {
            let course = {
              name: entry.courseId,
              id: "",
              url: "/course"
            };

            courseData.push(course);
          });
          if (this.state.role == "student") {
            courseData.push({ name: "Add course", id: "", url: "/addcourse" });
          } else {
            courseData.push({
              name: "Create course",
              id: "",
              url: "/createcourse"
            });
          }

          //update the state with the response data
          this.setState({
            courseList: courseData
          });
          console.log("get student courses call");
          console.log(this.state.courseList);
        },
        () => {
          courseData.push({ name: "No Courses Available" });
          courseData.push({ name: "Add course", id: "", url: "/addcourse" });

          courseData.push({
            name: "Create course",
            id: "",
            url: "/createcourse"
          });

          this.setState({
            courseList: courseData
          });
        }
      );
  }

  openMenu(activeState) {
    this.fetchCourses();
    this.setState({ activeState: activeState });

    this.openNav();
  }
  openNav() {
    this.sidebar.current.className = "sidenav col-md-2";
  }

  closeNav() {
    this.sidebar.current.className += " closed";
  }
  setActive(state) {
    this.setState({ activeState: state });
  }

  getList(state) {
    let stateList = {
      account: [
        { name: "profile", url: "/profile" },
        { name: "settings", url: "/profile", state: { editable: true } },
        { name: "notification", url: "/notifications" },
        { name: "files", url: "/files" }
      ],
      dashboard: [],
      courses: this.state.courseList[
        ({ name: "cmpe202", url: "/courses", id: "" },
        { name: "cmpe203", url: "/courses" },
        { name: "cmpe272", id: "", url: "/courses" })
      ]
    };
    return stateList[state];
  }

  renderList(arrayOfStateFields) {
    let outerContainer = [];

    if (arrayOfStateFields) {
      arrayOfStateFields.forEach(element => {
        outerContainer.push(
          React.createElement(
            Link,
            {
              className: "subNavElement",
              to: element.url ? element.url : "",
              state:
                element.state && element.state.toJSON
                  ? element.state.toJSON()
                  : ""
            },
            element.name
          )
        );
      });
    }
    return outerContainer;
  }

  render() {
    let subNav = this.renderList(this.getList(this.state.activeState));

    return (
      <div>
        <div className="Navbar">
          <div className="mainHeader">
            <div className="subHeader">
              <div className="headerLogo">
                <a
                  href="https://sjsu.instructure.com/"
                  className="headerLogoFormat"
                />
              </div>
              <ul className="headerListFormat">
                <li id="l1" className="headerListItemsFormat">
                  <a
                    className="headerProfileCustomeImage"
                    onClick={() => this.setActive("account")}
                  >
                    <div
                      className="headerProfileIconContainer"
                      aria-hidden="true"
                    >
                      <div className="headerProfileIconImage">
                        <i
                          className="glyphicon glyphicon-user"
                          onClick={() => this.openMenu("profile")}
                        />
                      </div>
                    </div>
                    <div className="headerTextFormat">Account</div>
                  </a>
                </li>
                <li id="l2" className="headerListItemsFormat">
                  <a
                    className="headerDashboardCustomImage"
                    onClick={() => this.setActive("dashboard")}
                  >
                    <div
                      className="headerProfileIconContainer"
                      aria-hidden="true"
                    >
                      <div className="headerProfileIconImage">
                        <i className="glyphicon glyphicon-dashboard" />
                      </div>
                    </div>
                    <div className="headerTextFormat">Dashboard</div>
                  </a>
                </li>
                <li id="l3" className="headerListItemsFormat">
                  <a
                    className="headerProfileCustomeImage"
                    onClick={() => this.fetchCourses()}
                  >
                    <div
                      className="headerProfileIconContainer"
                      aria-hidden="true"
                    >
                      <div className="headerProfileIconImage">
                        <i
                          className="glyphicon glyphicon-book"
                          onClick={() => this.openMenu("courses")}
                        />
                      </div>
                    </div>
                    <div className="headerTextFormat">Courses</div>
                  </a>
                </li>
                <li id="l4" className="headerListItemsFormat">
                  <a href="/profile" className="headerProfileCustomeImage">
                    <div
                      className="headerProfileIconContainer"
                      aria-hidden="true"
                    >
                      <div className="headerProfileIconImage">
                        <i />
                      </div>
                    </div>
                    <div className="headerTextFormat">Inbox</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          id="mySidenav"
          className="sidenav closed col-md-2"
          ref={this.sidebar}
        >
          <span
            className="closebtn pull-right "
            onClick={() => this.closeNav()}
          >
            &times;
          </span>
          {subNav}
          {/* <a href="#">About</a>
                    <a href="#" onClick={() => this.openNav()}>Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a> */}
        </div>

        {/* <span onClick={() => this.openNav()}>open</span> */}

        <div id="main">...</div>
      </div>
    );
  }
}

export default Navbar;
