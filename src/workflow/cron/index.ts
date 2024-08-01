import type { CronExpression } from '../../../utils/enums';
import { RequestHelper } from '../../../utils/helpers/request';

export type CronOptions = {
  id: CronExpression | string;
  expression: string;
};

export class Cron {
  request: RequestHelper;

  constructor(
    protected readonly options: CronOptions,
    protected readonly key: string,
    protected readonly projectId: string,
  ) {
    this.request = new RequestHelper(key);
  }

  schedule(scheduleId: string) {
    return this.request.post(`/workflow/${this.projectId}/wait/cron`, {
      schedule_id: scheduleId,
      cron_options: this.options,
    });
  }

  get cycle() {
    return new CronCycle(this.request, this.projectId, this.options.id);
  }

  cancel() {
    return this.request.delete(
      `/workflow/${this.projectId}/wait/cron/${this.options.id}/cancel`,
    );
  }
}
