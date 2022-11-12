import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { Service } from 'typedi';
import { User } from '../dto/auth/user';

@Service()
export default class AuthController {
  constructor(public userService: UserService) {}

  signIn = async (req: Request, res: Response) => {
    const token: string = await this.userService.signIn(req.body);
    res.successResponse({ token: token });
  };

  signUp = async (req: Request, res: Response): Promise<void> => {
    const response: User = await this.userService.signUp(req.body);
    res.successResponse(response);
  };

  test = (req: Request, res: Response): void => {
    const users: User[] = [{ id: 1, first_name: '', last_name: '', email: '' }];
    res.successResponse(users);
  };
}
