import React from 'react';

const ErrorPage = ({ errorCode }) => {
  let errorMessage = 'An error occurred.';

  // Handle different error codes with custom messages
  if (errorCode === 404) {
    errorMessage = 'Page not found.';
  } else if (errorCode === 500) {
    errorMessage = 'Internal server error.';
  } // Add more error code checks and custom messages as needed

  return (
    <div>
      <h1>Error {errorCode}</h1>
      <p>{errorMessage}</p>
      {/* You can add additional elements or links to assist users */}
    </div>
  );
};

export default ErrorPage;
