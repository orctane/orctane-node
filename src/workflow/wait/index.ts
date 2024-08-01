export type DelayForOptions = {
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

export class Wait {
  for(options: DelayForOptions) {}
}
