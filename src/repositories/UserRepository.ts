import { User } from '../entity/User';
import { User as UserInterface } from '../dto/auth/user';
import { Service } from 'typedi';
import AppDataSource from '../DataSource';
@Service()
export default class UserRepository {
  userRepo = AppDataSource.getRepository(User);
  createUser = async (userData: UserInterface): Promise<User> => {
    const user = new User();
    user.email = userData.email;
    user.first_name = userData.first_name;
    user.last_name = userData.last_name;
    user.password = userData.password;
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
