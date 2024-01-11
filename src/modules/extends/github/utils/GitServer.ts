function error(methodName) {
  throw new Error(`必须实现${methodName}方法`);
}

class GitServer {
  [x: string]: any;
  constructor(type, token=null) {
    this.type = type;
    this.token = token;
  }

  setToken(token) {
    this.token = token;
  }

  createRepo(name) {
    error("createRepo");
  }

  createOrgRepo(name, login) {
    error("createOrgRepo");
  }

  getRemote(login, name) {
    error("getRemote");
  }

  getUser() {
    error("getUser");
  }

  getOrg() {
    error("getOrg");
  }

  getRepo(login, name) {
    error("getRepo");
  }

  getTokenUrl() {
    error("getTokenUrl");
  }

  getTokenHelpUrl() {
    error("getTokenHelpUrl");
  }

  isHttpResponse = (response) => {
    return response && response.status;
  };

  handleResponse = (response) => {
    if (this.isHttpResponse(response) && response !== 200) {
      return null;
    } else {
      return response;
    }
  };
}

export default GitServer;