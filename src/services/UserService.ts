import { BadRequestError } from '../utils/response/errors/bad-request-error';
import { Service } from 'typedi';
import UserRepository from '../repositories/UserRepository';
import { UserDto, User as UserInterface, UserSingIn } from '../dto/auth/user';
import { User } from '../entity/User';
import { plainToClass } from 'class-transformer';
import { NotFoundError } from '../utils/response/errors/not-found-error';
import { JwtPayload } from '../types/JwtPayload';

@Service()
export default class UserService {
  constructor(public userRepository: UserRepository) {}

  signUp = async (data: UserInterface): Promise<UserDto> => {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      throw new BadRequestError('this email is already registered');
    }

    const result = await this.userRepository.createUser(data);
    return plainToClass(UserDto, result);
  };

  signIn = async (singInData: UserSingIn) => {
    const user: User | null = await this.userRepository.findByEmail(singInData.email);
    if (!user) {
      throw new BadRequestError('wrong credentials');
    }
    const validPassword = await user.checkPasswordMatch(singInData.password);
    if (!validPassword) {
      throw new BadRequestError('wrong credentials');
    }
    const jwtPayload: JwtPayload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    const token = user.createJwtToken(jwtPayload);
    return token;
  };

  // getAllUsers = async () => {
  //   return await this.userRepository.getAllUsers();
  // };
}
