import type { NotificationExpressions } from '../../../utils/enums';
import { RequestHelper } from '../../../utils/helpers/request';
import { isEmpty } from '../../../utils/is-empty';
import type { OrctaneSuccessResponse } from '../../../utils/types';

export type WaitNotificationResponse = { id: string; durations: number[] };

export type WaitNotificationOptions = { expires: Date; uid: string };

export class WaitNotification {
  request: RequestHelper;
  durations: (NotificationExpressions | string)[] = [];

  constructor(
    private readonly options: WaitNotificationOptions,
    key: string,
    private readonly workflowId: string,
  ) {
    this.request = new RequestHelper(key);
  }

  add(duration: NotificationExpressions | string) {
    this.durations.push(duration);
    return this;
  }

  trigger(scheduleId: string) {
    if (isEmpty(this.durations)) {
      throw new Error('No durations provided');
    }
    return this.request.post<OrctaneSuccessResponse<WaitNotificationResponse>>(
      `/workflows/${this.workflowId}/wait/notification/${scheduleId}`,
      {
        durations: this.durations,
        expires: this.options.expires,
        uid: this.options.uid,
      },
    );
  }
}
