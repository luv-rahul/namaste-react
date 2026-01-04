import React from "react";
import ReactDOM from "react-dom/client";

/*React Element*/
const heading = (
  <h1 id="heading" className="head">
    Namaste React Using JSX 🚀
  </h1>
);

const Title = () => {
  return <h1>Hello React!</h1>;
};

/*React Component*/
const HeadingComponent = () => {
  return (
    <div id="container">
      <Title />
      <Title></Title>
      {Title()}
      {heading}
      <h1 id="heading">Namaste React Using Functional Component🚀</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
