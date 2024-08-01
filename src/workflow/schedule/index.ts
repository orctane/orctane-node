import type { SendEmailOptions } from "../../base/types/send";

export type ScheduleOptions = {
  project_id?: string;
  id: string;
  ttl?: number;
};

export class Schedule {
  constructor(protected readonly options: ScheduleOptions) {
    if (!options.project_id) {
      throw new Error("Schedule requires a project ID");
    }
  }

  async send(options: SendEmailOptions) {}
}
