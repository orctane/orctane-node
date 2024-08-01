import type { SendEmailOptions } from '../../base/types/send';
import { RequestHelper } from '../../utils/helpers/request';

export type ScheduleOptions = {
  project_id?: string;
  id: string;
  ttl?: number;
};

export class Schedule {
  request: RequestHelper;
  constructor(
    protected readonly options: ScheduleOptions,
    protected readonly key: string,
    protected readonly projectId: string,
  ) {
    if (!options.project_id) {
      throw new Error('Schedule requires a project ID');
    }

    this.request = new RequestHelper(key);
  }

  async send(options: SendEmailOptions): Promise<string> {
    await this.request.post(`/workflow/schedule/${this.projectId}`, {
      schedule_id: this.options.id,
      options,
    });
    return this.options.id;
  }
}
