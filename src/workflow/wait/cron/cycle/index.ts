import type { RequestHelper } from "../../../../utils/helpers/request";
import { WaitCronCycleConditionals } from "./conditionals";

export class WaitCronCycle {
  constructor(
    protected readonly request: RequestHelper,
    protected readonly projectId: string,
    protected readonly cronId: string,
  ) {}

  skipNext() {
    return this.request.post(
      `/workflow/${this.projectId}/wait/cron/${this.cronId}/skip`,
      {
        cycle_count: 1,
      },
    );
  }

  skip(cycleCount: number) {
    return this.request.post(
      `/workflow/${this.projectId}/wait/cron/${this.cronId}/skip`,
      {
        cycle_count: cycleCount,
      },
    );
  }

  eq(cycleCount: number) {
    return new WaitCronCycleConditionals(
      this.request,
      this.projectId,
      this.cronId,
      "eq",
      cycleCount,
    );
  }
}
