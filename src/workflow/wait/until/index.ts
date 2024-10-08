import { RequestHelper } from '../../../utils/helpers/request';
import type { OrctaneSuccessResponse } from '../../../utils/types';

export type WaitUntilResponse = {
  id: string;
  ttl: number;
};

export class WaitUntil {
  request: RequestHelper;

  constructor(
    private readonly options: { date: Date },
    key: string,
    private readonly projectId: string,
  ) {
    this.request = new RequestHelper(key);
  }

  async trigger(scheduleId: string) {
    return await this.request.post<OrctaneSuccessResponse<WaitUntilResponse>>(
      `/workflows/${this.projectId}/wait/until/${scheduleId}`,
      this.options,
    );
  }
}
