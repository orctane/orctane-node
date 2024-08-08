import { RequestHelper } from '../../../utils/helpers/request';
import type { OrctaneSuccessResponse } from '../../../utils/types';

export type WaitUntilResponse = {
  id: string;
  ttl: number;
};

export class WaitUntil {
  request: RequestHelper;

  constructor(
    private readonly until: Date,
    key: string,
    private readonly projectId: string,
  ) {
    this.request = new RequestHelper(key);
  }

  trigger(scheduleId: string) {
    return this.request.post<OrctaneSuccessResponse<WaitUntilResponse>>(
      `/workflows/${this.projectId}/wait/until/${scheduleId}`,
      {
        date: this.until,
      },
    );
  }
}
