import { AppException } from 'src/utils/exception/app-exception/app-exception';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsRequireTokenToFile1715757835916
  implements MigrationInterface
{
  name = 'AddIsRequireTokenToFile1715757835916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.addColumn(
        'file',
        new TableColumn({
          name: 'isRequireToken',
          type: 'boolean',
          isNullable: true,
          default: false,
        }),
      );
    } catch (error) {
      throw AppException.handle(error.message, error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('file', 'isRequireToken');
  }
}
