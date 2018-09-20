var React = require("react");
var PropTypes = require("prop-types");

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
  }

  componentDidMount() {
    var stopper = this.props.text + "...";
    this.idInterval = setInterval(
      function() {
        this.state.text === stopper
          ? this.setState({ text: this.props.text })
          : this.setState({ text: this.state.text + "." });
      }.bind(this),
      300
    );
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  render() {
    return <h1 style={{ textAlign: "center" }}>{this.state.text}</h1>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
};

Loading.defaultProps = {
  text: "Loading"
};

module.exports = Loading;
