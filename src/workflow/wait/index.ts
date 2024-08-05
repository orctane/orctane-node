import { WaitFor, type WaitForOptions } from './for';
import { WaitNotification, type WaitNotificationOptions } from './notification';
import { WaitUntil } from './until';

export class Wait {
  constructor(
    protected readonly key: string,
    protected readonly workflowId: string,
  ) {}

  for(options: WaitForOptions) {
    return new WaitFor(options, this.key, this.workflowId);
  }

  until(date: Date) {
    return new WaitUntil(date, this.key, this.workflowId);
  }

  notify(options: WaitNotificationOptions) {
    return new WaitNotification(options, this.key, this.workflowId);
  }
}
