import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import icon from 'glyphicons'
import Navbar from '../LandingPage/Navbar';
import axios from 'axios';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                "user": "",
                "email": "",
                "phone": "",
                "City": "",
                "School": "",
                "HomeTown": "",
                "Country": "",
                "Languages": "",
                "Gender": "",
                "About Me": ""
            },
            editable: false,
            userId: "",
            role: ""
        }
        this.profileDetails = React.createRef();
        // if (cookie.load('cookie')) {
        //     let dummy = cookie.load('cookie');
        //     this.cookieObj = JSON.parse(dummy.substr(2, 200));
        //     this.setState({

        //         "userId": this.cookieObj.userId
        //     })

        //     this.setState({

        //         "role": this.cookieObj.role
        //     })

       // }
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount=this.componentDidMount.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:3001/profile', {
            // params: {
            //     userId: this.cookieObj.userId

            // }
        })
            .then((response) => {

                let userProfile = [];
                userProfile = response.data;

                //update the state with the response data
                this.setState({
                    details: {
                        "user": userProfile.Name,
                        "email": userProfile.Email,
                        "phone": userProfile.PhoneNumber,
                        "City": userProfile.City,
                        "School": userProfile.School,
                        "HomeTown": userProfile.Hometown,
                        "Country": userProfile.Country,
                        "Languages": "Test",
                        "Gender": userProfile.Gender,
                        "About Me": userProfile.AboutMe
                    }
                });
                console.log(userProfile);
            })

    }

    handleChange = (e) => {
        let copyDetails = this.state.details;
        copyDetails[e.target.getAttribute("fieldname")] = e.target.value;
        this.setState({ details: copyDetails });
    }
    createContent() {
        let editable = this.state.editable;
        let elementsArr = [];

        for (const key in this.state.details) {
            let val = this.state.details[key];

            // if (val === null) {
            //     val = "--"
            // }
            // else if (!val || !val.trim()) {
            //     val = "--"
            // }

            elementsArr.push(React.createElement('div', { className: "profileHeader" }, key))
            editable ? elementsArr.push(React.createElement('input', { fieldname: key, className: "profileDetail", placeholder: val, defaultValue: this.state.details[key], onChange: this.handleChange })) :
                elementsArr.push(React.createElement('div', { className: "profileDetail" }, val))


        }

        if (editable) {
            elementsArr.push(React.createElement('div', { className: "emptyDiv", }))
            elementsArr.push(React.createElement('button', { className: "submitButton", type: "submit", onClick: () => this.updateDetails() }, "Update"))
        }
        return elementsArr;
    }

    updateDetails() {
        //database call here

        this.setState({ "editable": !this.state.editable })

        const userProfileData = this.state.details;
        //userProfileData.userId = this.cookieObj.userId;

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with  the user data
        axios.post('http://localhost:3001/profile', userProfileData)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,


                    })
                } else {
                    this.setState({
                        authFlag: false,

                    })
                }
            });

    }

    editForm() {
        this.setState({ "editable": !this.state.editable })
        // var elementsArr = []

        // for (const key in this.state) {
        //     let val = this.state[key];
        //     if (!val.trim()) {
        //         val = "--"
        //     }

        //     elementsArr.push(React.createElement('div', { className: "profileHeader" }, key))
        //     elementsArr.push(React.createElement('input', { className: "profileDetail" }, val))
        // }


        // this.refs.profileDetails.current = elementsArr;
        //   this.createContent(true);

    }

    render() {
        let Content = this.createContent();

        return (

            <div>
                <div className="col-md-12 pull-right editProfile" title="Edit Profile">
                    <i className="glyphicon glyphicon-pencil pull-right" onClick={() => this.editForm()}></i></div>
                <div id="left-side" className="ic-app-course-menu list-view col-md-2 col-lg-2" >
                    {/*     <nav role="navigation" aria-label="Account Navigation Menu">
                        <ul id="section-tabs">
                            <li className="section"><a href="/profile/communication" title="Notifications" className="notifications" >Notifications</a></li>
                            <li className="section"><a href="/profile" title="Profile" className="profile active" >Profile</a></li>
                            <li className="section"><a href="/profile/files" title="Files" className="files" >Files</a></li>
                            <li className="section"><a href="/profile/settings" title="Settings" className="profile_settings" >Settings</a></li>
                            <li className="section"><a href="/dashboard/eportfolios" title="ePortfolios" className="eportfolios" >ePortfolios</a></li>
                        </ul>
                    </nav> */}
                </div>
                <div id="rightPanel" className="col-md-8 col-lg-8">

                    <div className="col-md-2 profilePicture">
                        <i className="glyphicon glyphicon-user"></i>


                    </div>

                    <div id="profileInfo" className="col-md-10" ref="profileDetails">
                        {this.createContent()}
                        {/* <div className="UserName">
                            <div className="profileHeader"> User <br></br></div>

                            {this.state.user}

                        </div>
                        <div className="">
                            <div className="profileHeader">  Email <br></br> </div>
                            {this.state.email}

                        </div>
                        <div className="">
                            <div className="profileHeader"> Phone <br></br> </div>
                            {this.state.phone}

                        </div>
                        <div className="">
                            <div className="profileHeader"> Info <br></br></div>

                            {this.state.other}
                        </div> <div className="">


                        </div> */}


                    </div>



                </div>



            </div>




        )

    }
}

export default Profile;