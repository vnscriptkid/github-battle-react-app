var React = require("react");
var PropTypes = require("prop-types");
var { Link } = require("react-router-dom");
var PlayerReview = require("./PlayerReview");

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit(this.props.id, this.state.value);
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="player-form">
        <label htmlFor="username">{this.props.label}</label>
        <input
          type="text"
          name="username"
          value={this.state.value}
          onChange={this.handleInputChange}
          placeholder="github username"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

function PlayerView(props) {
  return (
    <div className="player-view">
      <img src={props.image} alt={props.name} />
      <span className="player-view__name">@{props.name}</span>
      <span
        className="player-view__reset"
        onClick={function() {
          props.onReset(props.id);
        }}
      >
        Reset
      </span>
    </div>
  );
}

PlayerView.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: "",
      playerTwoImage: ""
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(id) {
    this.setState({
      [id + "Name"]: "",
      [id + "Image"]: ""
    });
  }

  handleFormSubmit(id, username) {
    this.setState(function() {
      var newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] =
        "https://github.com/" + username + ".png?size=200";
      return newState;
    });
  }

  render() {
    var playerOneName = this.state.playerOneName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoName = this.state.playerTwoName;
    var playerTwoImage = this.state.playerTwoImage;
    return (
      <div className="row">
        {!playerOneName ? (
          <PlayerInput
            id="playerOne"
            label="Player One"
            onFormSubmit={this.handleFormSubmit}
          />
        ) : (
          <PlayerReview avatar={playerOneImage} login={playerOneName}>
            <span
              className="player-view__reset"
              onClick={function() {
                this.handleReset("playerOne");
              }.bind(this)}
            >
              Reset
            </span>
          </PlayerReview>
        )}

        {playerOneName &&
          playerTwoName && (
            <Link
              to={`${
                this.props.match.url
              }/results?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`}
            >
              <button className="battle-btn">Battle</button>
            </Link>
          )}

        {!playerTwoName ? (
          <PlayerInput
            id="playerTwo"
            label="Player Two"
            onFormSubmit={this.handleFormSubmit}
          />
        ) : (
          <PlayerReview avatar={playerTwoImage} login={playerTwoName}>
            <span
              className="player-view__reset"
              onClick={function() {
                this.handleReset("playerTwo");
              }.bind(this)}
            >
              Reset
            </span>
          </PlayerReview>
        )}
      </div>
    );
  }
}

module.exports = Battle;
