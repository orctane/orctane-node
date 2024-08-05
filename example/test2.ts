import { sub, parseISO } from "date-fns";

export enum ReminderExpressions {
  THIRTY_MINUTES_BEFORE = "-30m",
  AN_HOUR_BEFORE = "-1h",
  AN_HOUR_AND_30_MINUTES_BEFORE = "-1h -30m",
  TWO_HOURS_BEFORE = "-2h",
  FIVE_HOURS_BEFORE = "-5h",
  TEN_HOURS_BEFORE = "-10h",
  TWELVE_HOURS_BEFORE = "-12h",
  A_DAY_BEFORE = "-1d",
  A_DAY_AND_HALF_BEFORE = "-1d -12h",
  TWO_DAYS_BEFORE = "-2d",
  THREE_DAYS_BEFORE = "-3d",
  A_WEEK_BEFORE = "-1w",
  TWO_WEEKS_BEFORE = "-2w",
  A_MONTH_BEFORE = "-1mo",
}

function convertToMilliseconds(
  reminderExpression: string,
  expirationDate: Date,
): number {
  const multipliers: { [key: string]: number } = {
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    mo: 30 * 24 * 60 * 60 * 1000, // Approximate month duration
  };

  const match = reminderExpression.match(/(-\d+(m|h|d|w|mo))/g);
  if (!match) {
    throw new Error("Invalid reminder expression format");
  }

  let totalMilliseconds = 0;

  console.log(match);

  for (const part of match) {
    const unitMatch = part.match(/^-(\d+)(m|h|d|w|mo)$/);
    if (!unitMatch) {
      throw new Error("Invalid reminder expression part format");
    }
    const [, amount, unit] = unitMatch;
    let durationInMilliseconds = 0;

    console.log({ unitMatch, part, unit });

    if (unit === "mo") {
      const months = Number.parseInt(amount);
      const duration = sub(expirationDate, { months }).getTime();
      durationInMilliseconds = expirationDate.getTime() - duration;
    } else {
      const multiplier = multipliers[unit];
      durationInMilliseconds = Number.parseInt(amount, 10) * multiplier;
    }

    totalMilliseconds += durationInMilliseconds;
  }

  const reminderTime = expirationDate.getTime() - totalMilliseconds;
  const now = Date.now();

  if (reminderTime <= now) {
    throw new Error("Reminder time is in the past. Cannot set reminder.");
  }

  if (reminderTime > expirationDate.getTime()) {
    throw new Error(
      "Reminder time is after the expiration date. Cannot set reminder.",
    );
  }

  return reminderTime - now;
}

// Usage example:
const expirationDate = new Date("2024-12-31T23:59:59.999Z");
const reminderExpression = "-1w -2d -18h -56m -67s";
const reminderTimeInMilliseconds = convertToMilliseconds(
  reminderExpression,
  expirationDate,
);
console.log(
  "Reminder time in milliseconds:",

  reminderTimeInMilliseconds,
  new Date(reminderTimeInMilliseconds + Date.now()),
  reminderTimeInMilliseconds / 1000 / 60 / 60 / 24,
);
