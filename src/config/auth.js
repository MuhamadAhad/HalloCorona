class Auth {
  constructor() {
    const userName = localStorage.getItem("userName");
    const level = localStorage.getItem("level");
    const token = localStorage.getItem("token");
    if (userName && level && token) {
      this.userName = userName;
      this.level = level;
      this.token = token;
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  signin(cb) {
    this.authenticated = true;
    cb();
  }

  signout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    localStorage.getItem("");
    return this.authenticated;
  }
}

export default Auth;
