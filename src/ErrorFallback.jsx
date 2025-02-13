import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <h2>Oops! Something went wrong.</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

export default ErrorFallback;
