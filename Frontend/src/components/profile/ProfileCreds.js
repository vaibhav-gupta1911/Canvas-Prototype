import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education, data } = this.props;

    const expItems = (
      <li key={"1"} className="list-group-item">
        <p>
          {data.hometown === "" ? null : (
            <span>
              <strong>Hometown: </strong> {data.hometown}
            </span>
          )}
        </p>
        <p>
          {data.city === "" ? null : (
            <span>
              <strong>City: </strong> {data.city}
            </span>
          )}
        </p>
        <p>
          {data.country === "" ? null : (
            <span>
              <strong>Country: </strong> {data.country}
            </span>
          )}
        </p>
      </li>
    );

    const eduItems = (
      <li key={"1"} className="list-group-item">
        <p>
          {data.email === "" ? null : (
            <span>
              <strong>Email: </strong> {data.email}
            </span>
          )}
        </p>
        <p>
          {data.phone === "" ? null : (
            <span>
              <strong>Phone: </strong> {data.phone}
            </span>
          )}
        </p>
        <p>
          {data.school === "" ? null : (
            <span>
              <strong>School: </strong> {data.school}
            </span>
          )}
        </p>
        <p>
          {data.gender === "" ? null : (
            <span>
              <strong>Gender: </strong> {data.gender}
            </span>
          )}
        </p>
      </li>
    );

    // const expItems = experience.map(exp => (
    //   <li key={exp._id} className="list-group-item">
    //     <h4>{exp.company}</h4>
    //     <p>
    //       <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
    //       {exp.to === null ? (
    //         " Now"
    //       ) : (
    //         <Moment format="YYYY/MM/DD">{exp.to}</Moment>
    //       )}
    //     </p>
    //     <p>
    //       <strong>Position:</strong> {exp.title}
    //     </p>
    //     <p>
    //       {exp.location === "" ? null : (
    //         <span>
    //           <strong>Location: </strong> {exp.location}
    //         </span>
    //       )}
    //     </p>
    //     <p>
    //       {exp.description === "" ? null : (
    //         <span>
    //           <strong>Description: </strong> {exp.description}
    //         </span>
    //       )}
    //     </p>
    //   </li>
    // ));

    // const eduItems = education.map(edu => (
    //   <li key={edu._id} className="list-group-item">
    //     <h4>{edu.school}</h4>
    //     <p>
    //       <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
    //       {edu.to === null ? (
    //         " Now"
    //       ) : (
    //         <Moment format="YYYY/MM/DD">{edu.to}</Moment>
    //       )}
    //     </p>
    //     <p>
    //       <strong>Degree:</strong> {edu.degree}
    //     </p>
    //     <p>
    //       <strong>Field Of Study:</strong> {edu.fieldofstudy}
    //     </p>
    //     <p>
    //       {edu.description === "" ? null : (
    //         <span>
    //           <strong>Description: </strong> {edu.description}
    //         </span>
    //       )}
    //     </p>
    //   </li>
    // ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Location</h3>
          {expItems != "" ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Information</h3>
          {eduItems.length != "" ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
