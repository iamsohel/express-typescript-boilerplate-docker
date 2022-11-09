import { BadRequestError } from '../utils/response/errors/bad-request-error';
import { Service } from 'typedi';
import UserRepository from '../repositories/UserRepository';
import { UserDto } from '../dto/auth/user';
import { plainToClass, classToPlain } from 'class-transformer';

@Service()
export default class UserService {
  constructor(public userRepository: UserRepository) {}

  signUp = async (email: string, first_name: string, last_name: string, password: string): Promise<UserDto> => {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new BadRequestError('this email is already registered');
    }

    const result = await this.userRepository.createUser(first_name, last_name, email, password);
    return plainToClass(UserDto, result);
    // let userData = { id: result.id, first_name: result.first_name, last_name: result.last_name, email: result.email}
    // return userData;
  };

  // signIn = async (email: string, password: string) => {
  //   this.logger.info(`Email of the registered user is ${email}`);
  //   const userWithEmail: User | null = await this.userRepository.findByEmail(email);
  //   if (!userWithEmail) {
  //     throw new ApplicationError('No User found with this email');
  //   }
  //   if (userWithEmail.password.toString() !== password) {
  //     throw new ApplicationError('Password did not match');
  //   }
  //   return 'Successfully Signed In';
  // };

  // getAllUsers = async () => {
  //   return await this.userRepository.getAllUsers();
  // };
}
