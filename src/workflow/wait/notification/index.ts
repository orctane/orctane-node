import type { NotificationExpressions } from '../../../utils/enums';
import { RequestHelper } from '../../../utils/helpers/request';
import { isEmpty } from '../../../utils/is-empty';
import type { OrctaneSuccessResponse } from '../../../utils/types';

export type WaitNotificationResponse = { id: string; durations: number[] };

export type WaitNotificationOptions = { expires: Date };

export class WaitNotification {
  request: RequestHelper;
  durations: {
    expression: NotificationExpressions | string;
  }[] = [];

  constructor(
    private readonly options: WaitNotificationOptions,
    key: string,
    private readonly workflowId: string,
  ) {
    this.request = new RequestHelper(key);
  }

  add(expression: NotificationExpressions | string) {
    this.durations.push({ expression });
    return this;
  }

  async trigger(scheduleId: string) {
    if (isEmpty(this.durations)) {
      throw new Error('No durations provided');
    }
    return await this.request.post<
      OrctaneSuccessResponse<WaitNotificationResponse>
    >(`/workflows/${this.workflowId}/wait/notifications/${scheduleId}`, {
      intervals: this.durations,
      expires: this.options.expires,
    });
  }
}
