import { RequestHandler } from 'express';

class UserControllers {
  getUser: RequestHandler = async (req, res) => {
    res.send('getUser');
  };
  getLoggedUser: RequestHandler = async (req, res) => {
    res.send('getLoggedUser');
  };
  getUsers: RequestHandler = async (req, res) => {
    res.send('getUsers');
  };
  edituser: RequestHandler = async (req, res) => {
    res.send('edituser');
  };
  searchUser: RequestHandler = async (req, res) => {
    res.send('searchUser');
  };
}

export default new UserControllers();
