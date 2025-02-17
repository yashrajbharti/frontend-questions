const withEnhancement = (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent {...props} newProp="I am an HOC!" />;
  };
};

// Full example of higher order component (HOC)

import React from "react";

// HOC that protects components by checking authentication
const withAuth = (WrappedComponent) => {
  return (props) => {
    if (!props.isAuthenticated) {
      return <h2>Please log in to access this page.</h2>;
    }
    return <WrappedComponent {...props} />;
  };
};

// Regular component
const Dashboard = () => <h2>Welcome to your dashboard!</h2>;

// Enhanced component with authentication check
const ProtectedDashboard = withAuth(Dashboard);

const App = () => {
  return <ProtectedDashboard isAuthenticated={false} />;
};

export default App;
