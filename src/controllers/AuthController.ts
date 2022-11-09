import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { Service } from 'typedi';
import { User } from '../dto/auth/user';

@Service()
export default class AuthController {
  constructor(public userService: UserService) {}

  // signIn = async (req: Request) => {
  //   const { email, password } = req.body;
  //   const response = await this.userService.signIn(email, password);
  // };

  signUp = async (req: Request, res: Response): Promise<void> => {
    const { email, first_name, last_name, password } = req.body;
    const response: User = await this.userService.signUp(email, first_name, last_name, password);
    res.successResponse(response);
  };

  test = (req: Request, res: Response): void => {
    const users: User[] = [{ id: 1, first_name: '', last_name: '', email: '' }];
    res.successResponse(users);
  };
}
