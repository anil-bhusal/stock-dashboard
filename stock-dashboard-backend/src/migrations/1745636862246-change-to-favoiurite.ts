import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ChangeToFavoiurite1745636862246 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "favorite",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "stockId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "isFavorite",
                        type: "boolean",
                        default: false,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "favorite",
            new TableForeignKey({
                columnNames: ["stockId"],
                referencedTableName: "stock",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("favorite");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("stockId") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("favorite", foreignKey);
        }
        await queryRunner.dropTable("favorite");
    }
}
