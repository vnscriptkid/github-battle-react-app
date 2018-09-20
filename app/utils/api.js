const axios = require("axios");

var id = "ecf8728a97eca8b82767";
var sec = "82bfe586a05a3858e9fe9adeb7cc8aece66ea49f";
// var params = "?client_id=" + id + "&client_secret=" + sec;
var params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username) {
  return axios
    .get("https://api.github.com/users/" + username)
    .then(function(res) {
      return res.data;
    });
}

function getRepos(username) {
  return axios
    .get("https://api.github.com/users/" + username + "/repos?per_page=100")
    .then(function(res) {
      return res.data;
    });
}

function getStarCount(repos) {
  return repos.reduce(function(total, current) {
    return total + current.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  return profile.followers + getStarCount(repos);
}

function getUserData(player) {
  return axios.all([getProfile(player), getRepos(player)]).then(function(data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    };
  });
}

function sortPlayers(players) {
  return players.sort(function(a, b) {
    return b.score - a.score;
  });
}

function handleError(e) {
  console.warn(e);
  return null;
}

module.exports = {
  battle: function(players) {
    return axios
      .all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI(
      "https://api.github.com/search/repositories?q=stars:>1+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories"
    );
    return axios.get(encodedURI).then(function(res) {
      return res.data.items;
    });
  }
};
