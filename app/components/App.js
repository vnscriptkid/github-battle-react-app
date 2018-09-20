var React = require("react");
var Popular = require("./Popular");
var Home = require("./Home");
var Battle = require("./Battle");
var Navbar = require("./Navbar");
var Results = require("./Results");
var { BrowserRouter, Route, Switch } = require("react-router-dom");

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route
              render={function() {
                return <h2 style={{ textAlign: "center" }}>404!</h2>;
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

module.exports = App;
