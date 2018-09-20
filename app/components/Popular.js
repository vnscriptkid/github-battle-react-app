var React = require("react");
var PropTypes = require("prop-types");
var api = require("../utils/api");
var Loading = require("./Loading");

function LanguageNavigation(props) {
  var languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="languages">
      {languages.map(function(lang) {
        return (
          <li
            className={lang === props.selected ? "selected" : null}
            key={lang}
            onClick={props.onChangeLanguage.bind(null, lang)}
          >
            {lang}
          </li>
        );
      }, this)}
    </ul>
  );
}

LanguageNavigation.propTypes = {
  selected: PropTypes.string.isRequired,
  onChangeLanguage: PropTypes.func.isRequired
};

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map(function(repo, index) {
        return (
          <li key={repo.name} className="popular-item">
            <h2 className="popular-item__rank">#{index + 1}</h2>
            <img
              className="popular-item__avatar"
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
            />
            <p>
              <a href={repo.html_url}>{repo.name}</a>
            </p>
            <p>@{repo.owner.login}</p>
            <p>{repo.stargazers_count} stars</p>
          </li>
        );
      })}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object).isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "All",
      repos: null
    };
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(lang) {
    this.setState(
      function() {
        return {
          selected: lang,
          repos: null
        };
      },
      function() {
        console.log("fetch: ", this.state.selected);
        api.fetchPopularRepos().then(
          function(repos) {
            this.setState(function() {
              return {
                repos: repos
              };
            });
          }.bind(this)
        );
      }.bind(this)
    );
  }

  componentDidMount() {
    this.changeLanguage(this.state.selected);
  }

  render() {
    return (
      <React.Fragment>
        <LanguageNavigation
          selected={this.state.selected}
          onChangeLanguage={this.changeLanguage}
        />

        {!this.state.repos ? (
          <Loading />
        ) : (
          <RepoGrid repos={this.state.repos} />
        )}
      </React.Fragment>
    );
  }
}

module.exports = Popular;
