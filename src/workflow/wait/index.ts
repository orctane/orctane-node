import { WaitCron, type WaitCronOptions } from "./cron";
import { WaitFor, type WaitForOptions } from "./for";
import { WaitReminder, type WaitReminderOptions } from "./reminder";
import { WaitUntil } from "./until";

export class Wait {
  constructor(
    protected readonly key: string,
    protected readonly projectId: string,
  ) {}

  for(options: WaitForOptions) {
    return new WaitFor(options, this.key, this.projectId);
  }

  until(date: Date) {
    return new WaitUntil(date, this.key, this.projectId);
  }

  remind(options: WaitReminderOptions) {
    return new WaitReminder(options, this.key, this.projectId);
  }

  cron(options: WaitCronOptions) {
    return new WaitCron(options, this.key, this.projectId);
  }
}
