import { RequestHelper } from '../../../utils/helpers/request';

export type WaitForOptions = {
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

export class WaitFor {
  request: RequestHelper;

  constructor(
    private readonly options: WaitForOptions,
    key: string,
    private readonly projectId: string,
  ) {
    this.request = new RequestHelper(key);
  }

  trigger(scheduleId: string) {
    return this.request.post(`/workflow/${this.projectId}/wait/for`, {
      schedule_id: scheduleId,
      waiting_time_options: this.options,
    });
  }
}
