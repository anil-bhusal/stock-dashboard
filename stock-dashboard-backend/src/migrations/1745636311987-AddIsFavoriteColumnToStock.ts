import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddIsFavoriteColumnToStock1745636311987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the 'isFavorite' column to the 'stocks' table
        await queryRunner.addColumn("stocks", new TableColumn({
            name: "isFavorite",
            type: "boolean",
            default: false, // Default value is false
            isNullable: false, // This ensures the column cannot be NULL
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the 'isFavorite' column from the 'stocks' table
        await queryRunner.dropColumn("stocks", "isFavorite");
    }

}
