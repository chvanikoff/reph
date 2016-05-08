import React from "react";

export default class App extends React.Component {
  render() {
    return <div className="container">
      <header className="header">
        <nav role="navigation">
          <ul className="nav nav-pills pull-right">
            <li><a href="http://www.phoenixframework.org/docs">Get Started</a></li>
          </ul>
        </nav>
        <span className="logo"></span>
      </header>
      {this.props.children}
    </div>;
  }
};