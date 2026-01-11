import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props); // !Important

    this.state = {
      count: 0,
      userInfo: {
        name: "Dummy",
        location: "Default",
        avatar_url: "https://dummy-photo.com",
      },
    };

    console.log("Child Constructor");
  }

  async componentDidMount() {
    console.log("Child componentDidMount");

    const data = await fetch("https://api.github.com/users/luv-rahul");
    const json = await data.json();
    console.log(json);

    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count != prevState) {
      // Code
    }
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    console.log("Child Render");
    const { count } = this.state;
    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div className="border-amber-500 border">
        <img src={avatar_url}></img>
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h3>Contact: luv-rahul@github.com</h3>
        <h4>Count 1: {count}</h4>
        <button
          className="border rounded-lg"
          onClick={() => {
            // count = count + 1; // ! NEVER UPDATE LIKE THIS
            this.setState({
              count: count + 1,
            });
          }}
        >
          Count++
        </button>
      </div>
    );
  }
}

export default UserClass;
