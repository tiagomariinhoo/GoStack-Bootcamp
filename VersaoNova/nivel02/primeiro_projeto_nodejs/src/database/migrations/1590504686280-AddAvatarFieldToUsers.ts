import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddAvatarFieldToUsers1590504686280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('users', new TableColumn({
        name: 'avatar',
        type: 'varchar', //Salva apenas o caminho da imagem no banco para n ser pesado
        isNullable: true,
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users', 'avatar');
    }

}
