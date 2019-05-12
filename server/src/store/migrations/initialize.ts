import {MigrationInterface, QueryRunner} from 'typeorm';
import AccountEntity from '../entities/AccountEntity';
import UserEntity from '../entities/UserEntity';

const admin = {
  username: 'admin',
  password: 'admin',
  email: 'admin@test.com',
  firstName: 'John',
  lastName: 'Smith',
};

class Initialize1000000000000 implements MigrationInterface {
// todo: clean
//  class Initialize1557530540209 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    const insertUserResult = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
      })
      .execute();
    const user = insertUserResult.generatedMaps[0];
    const passwordHash = AccountEntity.getPasswordHash(admin.password);
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(AccountEntity)
      .values({
        username: admin.username,
        passwordHash: passwordHash.hash,
        passwordSalt: passwordHash.salt,
        user,
      })
      .execute();
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(AccountEntity)
      .where('username = ":username"', {username: admin.username})
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('email = ":email"', {email: admin.email})
      .execute();
  }

}

export default Initialize1000000000000;
