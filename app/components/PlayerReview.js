var React = require("react");
var PropTypes = require("prop-types");

function PlayerReview(props) {
  return (
    <React.Fragment>
      <div className="player__review">
        <img className="player__avatar" src={props.avatar} alt={props.login} />
        <p className="player__login">@{props.login}</p>
        {props.children}
      </div>
    </React.Fragment>
  );
}

PlayerReview.propTypes = {
  avatar: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired
};

module.exports = PlayerReview;
