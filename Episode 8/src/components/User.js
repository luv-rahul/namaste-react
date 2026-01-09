import { useState } from "react";

const User = ({ name }) => {
  const [count] = useState(0);
  const [count2] = useState(1);
  return (
    <div className="user-card">
      <h2>Name: {name}</h2>
      <h3>Location: New Delhi</h3>
      <h3>Contact: luv-rahul@github.com</h3>
      <h4>Count 1: {count}</h4>
      <h4>Count 2: {count2}</h4>
    </div>
  );
};

export default User;
