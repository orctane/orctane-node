import { RequestHelper } from '../../../utils/helpers/request';

export type WaitForOptions = {
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export class WaitFor {
  request: RequestHelper;

  constructor(
    private readonly options: WaitForOptions,
    key: string,
    private readonly workflowId: string,
  ) {
    this.request = new RequestHelper(key);
  }

  trigger(scheduleId: string) {
    return this.request.post(
      `/workflows/${this.workflowId}/wait/for/${scheduleId}`,
      this.options,
    );
  }
}
