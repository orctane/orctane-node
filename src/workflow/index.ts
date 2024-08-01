import { Cron, type CronOptions } from './cron';
import { Schedule, type ScheduleOptions } from './schedule';
import { Wait } from './wait';

export type WorkflowOptions = {
  projectId: string;
};

export class Workflow {
  constructor(
    protected readonly options: WorkflowOptions,
    protected readonly key: string,
  ) {}

  get wait() {
    return new Wait(this.key, this.options.projectId);
  }

  cron(options: CronOptions) {
    return new Cron(options, this.key, this.options.projectId);
  }

  schedule(options: ScheduleOptions) {
    return new Schedule({ ...options, project_id: this.options.projectId });
  }
}
