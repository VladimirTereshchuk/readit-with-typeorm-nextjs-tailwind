import { IsEmail, IsNotEmpty, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
  BeforeInsert,
} from "typeorm";
import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";

@Entity("users")
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  //   @IsEmail({ message: "Заполните поле Email, please." })
  @IsEmail({}, { message: "Incorrect email" })
  @IsNotEmpty({ message: "Заполните поле Email, please." })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 255, { message: "Username must be at least 3 characters long" })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Length(6, 255)
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updateddAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
  toJSON() {
    return classToPlain(this);
  }
}
