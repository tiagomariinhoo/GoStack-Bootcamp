import Bee from 'bee-queue';
import NotificationMail from '../app/jobs/NotificationMail';
import redisConfig from '../config/redis';

// Da mesma forma que os models
const jobs = [NotificationMail];

class Queue {
  constructor() {
    // Cada tipo de serviço terá sua própria fila
    this.queues = {};
    this.init();
  }

  init() {
    // Desestruturação no forEach
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle, // Handle que vem de dentro do job
      };
    });
    // Todos os trabalhos que ficam dentro de filas, são chamados de jobs
  }

  // Sempre que um email for disparado é necessário colocar isso na fila
  /**
   * Queue: Em qual fila será disparado
   * Job: Dados do job, onde virá o appointment ou informações passadas para o handle
   */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      // On failed é pra ver se tá tudo bem
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
