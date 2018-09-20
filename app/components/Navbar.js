var React = require("react");
var { Link, Route } = require("react-router-dom");
var PropTypes = require("prop-types");

var links = [
  { to: "/", text: "Home" },
  { to: "/battle", text: "Battle" },
  { to: "/popular", text: "Popular" }
];

// <LinkCustom to="/popular"> Popular </LinkCustom>

class LinkCustom extends React.Component {
  render() {
    return (
      <Route
        exact
        path={this.props.to}
        children={function(props) {
          return (
            <Link
              to={this.props.to}
              className={props.match ? "selected" : null}
            >
              {this.props.children}
            </Link>
          );
        }.bind(this)}
      />
    );
  }
}

LinkCustom.propTypes = {
  to: PropTypes.string.isRequired
};

class Navbar extends React.Component {
  render() {
    return (
      <ul className="navbar">
        {links.map(function(link) {
          return (
            <li key={link.text}>
              <LinkCustom to={link.to}>{link.text}</LinkCustom>
            </li>
          );
        })}
      </ul>
    );
  }
}

module.exports = Navbar;
