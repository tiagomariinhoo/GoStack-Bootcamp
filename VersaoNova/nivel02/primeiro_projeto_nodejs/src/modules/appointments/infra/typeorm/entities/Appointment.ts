import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

// Vai enviar essa classe
// a classe é o parâmetro que estamos passando para a entidade
@Entity('appointments')
class Appointment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // Muitos agendamentos para um usuário
  @JoinColumn({name: 'provider_id'})
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Esse omit remove o Id na hora de passar os parâmetros
  // O id eu não quero que ninguem crie
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
