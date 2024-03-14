import React from "react";
import { Outlet } from "react-router-dom";

class ErrorBoundry extends React.Component {
  state = {
    error: null,
  };
  componentDidCatch(error) {
    this.setState((prevState) => {
      return {
        error: true,
      };
    });
  }
  render() {
    return this.state.error === null ? (
      <Outlet />
    ) : (
      <h1>Something went wrong!</h1>
    );
  }
}

export default ErrorBoundry;
