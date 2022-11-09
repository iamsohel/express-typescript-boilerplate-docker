import { User } from '../entity/User';
import { Service } from 'typedi';
import { AppDataSource } from '../DataSource';
@Service()
export default class UserRepository {
  userRepo = AppDataSource.getRepository(User);
  // constructor(public userRepository: AppDataSource.getRepository(User)){}
  createUser = async (first_name: string, last_name: string, email: string, password: string): Promise<User> => {
    const user = new User();
    user.email = email;
    user.first_name = first_name;
    user.last_name = last_name;
    user.password = password;
    await user.hashPassword();
    await this.userRepo.save(user);
    return user;
  };

  findByEmail = async (email: string): Promise<User | null> => {
    return await this.userRepo.findOneBy({ email: email });
  };

  // getAllUsers = async (): Promise<User[]> => {
  //   return await User.findAll();
  // };
}
