import { uuid } from 'uuidv4';

interface AppointmentConstructor {
  provider: string;
  date: Date;
}

class Appointment {
  id: string;

  provider: string;

  date: Date;

  // Esse omit remove o Id na hora de passar os parâmetros
  // O id eu não quero que ninguem crie
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
