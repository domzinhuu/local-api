import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../entity/User';

export class CreateAdminUser1561744204652 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user: User = new User();
    user.username = 'admin';
    user.password = '1234';
    user.name = 'Adminstrador';
    user.email = 'adm@sharklasers.com';
    user.hashPassword();
    user.role = 'admin';
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
