// npm install react-router-dom

import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const NotFound = () => <h2>404 Page Not Found</h2>;

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

// SPA with path based routes

import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const HomeExample = () => <h2>Home Page</h2>;
const AboutExample = () => <h2>About Page</h2>;

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

// Dynamic

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const User = () => {
  const { id } = useParams(); // Accessing the dynamic route parameter
  return <h2>User ID: {id}</h2>;
};

function DynamicApp() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/user/1">User 1</Link>
          </li>
          <li>
            <Link to="/user/2">User 2</Link>
          </li>
        </ul>
      </nav>

      <Route path="/user/:id" component={User} />
    </Router>
  );
}
