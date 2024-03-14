import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <p>
        The page you are trying to visit, seems to not exist on our server. if
        you feel otherwise, please feel free to contact our support staff.
      </p>
      <Link to= '/'>Go Home</Link>
    </React.Fragment>
  );
};

export default NotFoundPage;
