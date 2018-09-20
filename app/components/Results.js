var React = require("react");
var qs = require("query-string");
var PropTypes = require("prop-types");
var api = require("../utils/api");
var Loading = require("./Loading");
var PlayerReview = require("./PlayerReview");

function PlayerDetails(props) {
  return (
    <div className="player_details">
      <p>{props.profile.name}</p>
      <p>{props.profile.location}</p>
      <p>Followers: {props.profile.followers}</p>
      <p>Following: {props.profile.following}</p>
      <p>Public Repos: {props.profile.public_repos}</p>
    </div>
  );
}

PlayerDetails.propTypes = {
  profile: PropTypes.object.isRequired
};

function Player(props) {
  return (
    <div className="player">
      <div className="player__header">
        <p className="player__label">{props.label}</p>
        <p className="player__score">Score: {props.score}</p>
        <PlayerReview
          avatar={props.profile.avatar_url}
          login={props.profile.login}
        >
          <PlayerDetails profile={props.profile} />
        </PlayerReview>
      </div>
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired
};

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const params = qs.parse(this.props.location.search);
    api.battle([params.playerOneName, params.playerTwoName]).then(
      function(data) {
        if (data === null) {
          this.setState({
            error: "Something wrong happened!",
            loading: false
          });
          return;
        }
        this.setState({
          error: null,
          winner: data[0],
          loser: data[1],
          loading: false
        });
      }.bind(this)
    );
  }

  render() {
    var winner = this.state.winner;
    var loser = this.state.loser;
    var error = this.state.error;
    var loading = this.state.loading;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <h2>Oops! Something wrong happened ... </h2>;
    }

    return (
      <div className="battle-result">
        <Player
          label="Winner"
          score={winner.score.toString()}
          profile={winner.profile}
        />
        <Player
          label="Loser"
          score={loser.score.toString()}
          profile={loser.profile}
        />
      </div>
    );
  }
}

module.exports = Results;
