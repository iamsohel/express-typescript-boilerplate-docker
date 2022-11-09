import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Length, IsEmail, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import bcrypt from 'bcrypt';
import { Base } from './Base';

@Entity('users')
export class User extends Base {
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @IsNotEmpty()
  @Length(3, 20)
  @IsEmail()
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ nullable: true, default: true })
  is_active: boolean;

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPasswordMatch(unEncryptedPassword: string) {
    return await bcrypt.compare(unEncryptedPassword, this.password);
  }
}
