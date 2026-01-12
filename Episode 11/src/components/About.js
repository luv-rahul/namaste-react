import User from "./User";
import UserClass from "./UserClass";
import React from "react";
import UserContext from "../utils/UserContext";

class About extends React.Component {
  constructor(props) {
    super(props);

    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent componentDidMount");
  }

  render() {
    console.log("Parent Render");
    return (
      <div className="about">
        <h2 className="text-4xl font-bold">About</h2>
        <h3>This is Namaste React</h3>
        <div>
          <UserContext.Consumer>
            {(data) => <h1 className="font-bold">User: {data.loggedInUser}</h1>}
          </UserContext.Consumer>
        </div>
        <UserClass />
      </div>
    );
  }
}

export default About;
