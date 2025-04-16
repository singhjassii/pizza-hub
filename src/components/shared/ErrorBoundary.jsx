import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    console.error("Error in Component: ", error);
    return { hasError: true, message: error?.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in Component: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { errorComponent: ErrorComponent } = this.props;
      if (ErrorComponent) {
        return <ErrorComponent message={this.state.message} />;
      }
      return <h2>Something went wrong.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
