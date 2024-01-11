import GitServer from "./GitServer";
import GithubRequest from "./GithubRequest";

class GitHub extends GitServer {
  constructor() {
    super("github");
    this.request = null;
  }

  getUser() {
    return this.request.get("/user");
  }

  getOrg() {
    return this.request.get(`/user/orgs`, {
      page: 1,
      per_page: 100,
    });
  }

  getRepo(login, name) {
    return this.request.get(`/repos/${login}/${name}`).then((response) => {
      return this.handleResponse(response);
    });
  }

  createRepo(name) {
    return this.request.post(
      "/user/repos",
      {
        name,
      },
      {
        Accept: "application/vnd.github.v3+json",
      }
    );
  }

  createOrgRepo(name, login) {
    return this.request.post(
      `/orgs/${login}/repos`,
      {
        name,
      },
      {
        Accept: "application/vnd.github.v3+json",
      }
    );
  }

  setToken(token) {
    super.setToken(token);
    this.request = new GithubRequest(token);
  }
  getTokenUrl() {
    return "https://github.com/settings/tokens";
  }

  getTokenHelpUrl() {
    return "https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh";
  }

  getRemote(login, name) {
    return `git@github.com:${login}/${name}.git`;
  }
}

export default GitHub;
