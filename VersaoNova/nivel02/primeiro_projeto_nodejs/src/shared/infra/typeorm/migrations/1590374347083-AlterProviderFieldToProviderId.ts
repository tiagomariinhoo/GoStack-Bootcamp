import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFieldToProviderId1590374347083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      // Basta olhar os parâmetros
      await queryRunner.dropColumn('appointments', 'provider');

      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }));

      await queryRunner.createForeignKey('appointments', new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'], //Coluna que vai receber a chave estrangeira
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',//O que vai acontecer caso esse usuário seja deletado
        onUpdate: 'CASCADE', //Para que seja atualizado nos relacionamentos
      }))
    }

    /**
     * No On Delete
     * Podemos escolher o cascade, para que saia deletando tudo
     * em cascata. O set null é interessante pois é possível
     * guardar o histórico mesmo que o usuário seja deletado
     */

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
      await queryRunner.dropColumn('appointments', 'provider_id');
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider',
        type: 'varchar',
      }))
    }

}
