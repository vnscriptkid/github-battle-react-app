var React = require("react");
var { Link } = require("react-router-dom");

class Home extends React.Component {
  render() {
    return (
      <div className="intro">
        <h1>Github Battle: Fight the new way</h1>
        <Link to="/battle">Battle</Link>
      </div>
    );
  }
}

module.exports = Home;
