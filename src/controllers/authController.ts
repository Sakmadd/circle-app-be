import { RequestHandler } from 'express';

class AuthControllers {
  login: RequestHandler = async (req, res) => {
    res.send('login');
  };

  register: RequestHandler = async (req, res) => {
    res.send('register');
  };

  forgotPassword: RequestHandler = async (req, res) => {
    res.send('forgotPassword');
  };

  resetPassword: RequestHandler = async (req, res) => {
    res.send('resetPassword');
  };
}

export default new AuthControllers();
