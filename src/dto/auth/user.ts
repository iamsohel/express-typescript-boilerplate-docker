import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  password: string;
}

export interface User {
  id: number;

  first_name: string;

  last_name: string;

  email: string;

  password?: string;
}
