import { Schedule, ScheduleOptions } from "./schedule";
import { Wait } from "./wait";

export type WorkflowOptions = {
  project_id: string;
};

export class Workflow {
  // wait: Wait

  constructor(private readonly options: WorkflowOptions) {
    // this.wait = new Wait();
  }

  get wait() {
    return new Wait();
  }

  schedule(options: ScheduleOptions) {
    return new Schedule({ ...options, project_id: this.options.project_id });
  }
}

// const wf = new Workflow({ project_id: 'po_9024EERQdae' });
