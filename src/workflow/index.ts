import { Schedule, type ScheduleOptions } from './schedule';
import { Wait } from './wait';

export type WorkflowOptions = {
  project_id: string;
};

export class Workflow {
  constructor(
    protected readonly options: WorkflowOptions,
    protected readonly key: string,
  ) {}

  get wait() {
    return new Wait(this.key, this.options.project_id);
  }

  schedule(options: ScheduleOptions) {
    return new Schedule({ ...options, project_id: this.options.project_id });
  }
}
