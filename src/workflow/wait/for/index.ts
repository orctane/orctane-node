import { RequestHelper } from '../../../utils/helpers/request';
import type { OrctaneSuccessResponse } from '../../../utils/types';

export type WaitForResponse = {
  id: string;
  ttl: number;
};

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

  async trigger(scheduleId: string) {
    return await this.request.post<OrctaneSuccessResponse<WaitForResponse>>(
      `/workflows/${this.workflowId}/wait/for/${scheduleId}`,
      this.options,
    );
  }
}
