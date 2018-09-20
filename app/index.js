var React = require("react");
var ReactDOM = require("react-dom");
require("./index.css");
var App = require("./components/App");
var axios = require("axios");
window.axios = axios;

ReactDOM.render(<App />, document.getElementById("app"));
