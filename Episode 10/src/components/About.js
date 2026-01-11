import User from "./User";
import UserClass from "./UserClass";
import React from "react";

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
        <UserClass />
      </div>
    );
  }
}

export default About;
