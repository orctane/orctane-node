import type { ReminderExpressions } from "../../../utils/enums";
import { RequestHelper } from "../../../utils/helpers/request";

export type WaitReminderOptions = { expires: Date; id: string };

export class WaitReminder {
  request: RequestHelper;
  durations: (ReminderExpressions | string)[] = [];

  constructor(
    private readonly options: WaitReminderOptions,
    key: string,
    private readonly projectId: string,
  ) {
    this.request = new RequestHelper(key);
  }

  at(duration: ReminderExpressions | string) {
    this.durations.push(duration);
    return this;
  }

  trigger(scheduleId: string) {
    return this.request.post(`/workflow/${this.projectId}/wait/for`, {
      schedule_id: scheduleId,
      waiting_time_options: this.options,
    });
  }
}

// const b = new WaitReminder(
//   { expires: new Date("2024-12-31T"), id: "reminder.userId" },
//   "",
//   "",
// );
// await b.at(ReminderExpressions.AT_10_PERCENT)
//   .at(ReminderExpressions.AT_30_PERCENT)
//   .trigger('abc')
