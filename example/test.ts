import { sub } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export enum ReminderExpressions {
  THIRTY_MINUTES_BEFORE = "-30m",
  AN_HOUR_BEFORE = "-1h",
  TWO_HOURS_BEFORE = "-2h",
  FIVE_HOURS_BEFORE = "-5h",
  TEN_HOURS_BEFORE = "-10h",
  TWELVE_HOURS_BEFORE = "-12h",
  A_DAY_BEFORE = "-1d",
  TWO_DAYS_BEFORE = "-2d",
  THREE_DAYS_BEFORE = "-3d",
  A_WEEK_BEFORE = "-1w",
  TWO_WEEKS_BEFORE = "-2w",
  A_MONTH_BEFORE = "-1mo",
}

function convertToMilliseconds(
  reminderExpression: string,
  expirationDate: Date,
  timeZone: string,
): number {
  const multipliers: { [key: string]: number } = {
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    mo: 30 * 24 * 60 * 60 * 1000, // Approximate month duration
  };

  const match = reminderExpression.match(/^-(\d+)(m|h|d|w|mo)$/);
  if (!match) {
    throw new Error("Invalid reminder expression format");
  }

  const [, amount, unit] = match;
  let durationInMilliseconds = 0;

  if (unit === "mo") {
    const months = Number.parseInt(amount, 10);
    const duration = sub(expirationDate, { months }).getTime();
    durationInMilliseconds = expirationDate.getTime() - duration;
  } else {
    const multiplier = multipliers[unit];
    durationInMilliseconds = Number.parseInt(amount, 10) * multiplier;
  }

  const zonedExpirationDate = toZonedTime(expirationDate, timeZone);
  const reminderTime = zonedExpirationDate.getTime() - durationInMilliseconds;
  const now = Date.now();

  if (reminderTime <= now) {
    throw new Error("Reminder time is in the past. Cannot set reminder.");
  }

  if (reminderTime > zonedExpirationDate.getTime()) {
    throw new Error(
      "Reminder time is after the expiration date. Cannot set reminder.",
    );
  }

  return reminderTime - now;
}

// Usage example:
const expirationDate = new Date("2024-12-31T00:00:00Z");
const reminderExpression = ReminderExpressions.A_MONTH_BEFORE;
const timeZone = "Australia/Sydney";
const reminderTimeInMilliseconds = convertToMilliseconds(
  reminderExpression,
  expirationDate,
  timeZone,
);

console.log("Reminder time in milliseconds:", reminderTimeInMilliseconds);
console.log(
  "Reminder date:",
  new Date(reminderTimeInMilliseconds + Date.now()),
);
