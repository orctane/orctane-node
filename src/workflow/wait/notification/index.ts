import type { NotificationExpressions } from '../../../utils/enums';
import { RequestHelper } from '../../../utils/helpers/request';
import { isEmpty } from '../../../utils/is-empty';

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
    return this.request.post(
      `/workflows/${this.workflowId}/wait/notification/${scheduleId}`,
      {
        durations: this.durations,
        expires: this.options.expires,
        uid: this.options.uid,
      },
    );
  }
}

// const b = new WaitNotification(
//   { expires: new Date("2024-12-31T"), id: "reminder.userId" },
//   "",
//   "",
// );
// await b.at(NotificationExpressions.AT_10_PERCENT)
//   .at(NotificationExpressions.AT_30_PERCENT)
//   .trigger('abc')
