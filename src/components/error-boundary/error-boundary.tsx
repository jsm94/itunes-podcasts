import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { Card } from "../card/card";

import "./error-boundary.css";

type componentError = {
  message: string;
};

export const ErrorBoundary = () => {
  const error = useRouteError() as Error | componentError;
  console.log(error);
  return (
    <div className="error-boundary__container">
      <h1>Oops!</h1>
      <p>
        Something went wrong. Please try again.
        {isRouteErrorResponse(error) && (
          <code> Error: {error.data.message}</code>
        )}
      </p>
      {
        <Card>
          <code> Error: {error.message}</code>
        </Card>
      }
    </div>
  );
};
