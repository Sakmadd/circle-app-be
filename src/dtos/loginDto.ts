class LoginDto {
  username: string;
  password: string;
  constructor({ username, password }) {
    this.password = username;
    this.password = password;
  }
}

export default LoginDto;
