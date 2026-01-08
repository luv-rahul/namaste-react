import { useRouteError } from "react-router";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h2>OOPS!😥</h2>
      <h3>Something Went Wrong!!</h3>
      <h4>
        {error.status}: {error.statusText}
      </h4>
    </div>
  );
};

export default Error;
