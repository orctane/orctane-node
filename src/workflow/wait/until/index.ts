import { RequestHelper } from "../../../utils/helpers/request";

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
    return this.request.post(`/workflow/${this.projectId}/wait/until`, {
      schedule_id: scheduleId,
      until: this.until,
    });
  }
}
