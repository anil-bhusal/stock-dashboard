import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddToFavoriteRelation1745635214624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add a foreign key column to the favorite table
    await queryRunner.addColumn(
      'favorite', // This is the table name of your 'favorite' table
      new TableColumn({
        name: 'stockId',
        type: 'int',
        isNullable: true, // Make it nullable if it's optional
      })
    );

    // Add the foreign key constraint
    await queryRunner.createForeignKey(
      'favorite',
      new TableForeignKey({
        columnNames: ['stockId'],
        referencedTableName: 'stock',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL', // or CASCADE depending on your requirements
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('favorite');
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes('stockId'));

    if (foreignKey) {
      await queryRunner.dropForeignKey('favorite', foreignKey);
    }

    await queryRunner.dropColumn('favorite', 'stockId');
  }
}
