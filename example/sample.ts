import Orctane, {
  SESProvider,
  ResendProvider,
  SendgridProvider,
  PostmarkProvider,
} from "@orctane/node";

const orctane = new Orctane("orc_123456789");

/**
 * Sending Feature
 */

const resend = await ResendProvider("API_KEY");

const postmark = await PostmarkProvider("API_KEY");

const sendgrid = await SendgridProvider("API_KEY");

const aws = await SESProvider({
  region: "eu-west-1",
  accessKeyId: "AWS_KEY_ID",
  secretAccessKey: "SECRET_ACCESS_KEY",
});

await orctane.send({
  project_id: "uAh1XjVUdUfNPKyyvnL7T4AWwZDO",
  template_id: "forgot_password",
  version: "latest",
  localization: "fr", // Translate to french
  subject: "Your forgot password link",
  preview_text: "Hello World",
  from: "Orctane Onboarding <onboarding@orctane.dev>",
  to: "Jordan Isip <jordan@usewaypoint.com>",
  provider: resend,
  variables: {
    passcode: "1234510",
    expiresIn: "45 minutes",
  },
});

/**
 * Workflow
 */
const workflow = await orctane.workflow({
  projectId: "uAh1XjVUdUfNPKyyvnL7T4AWwZDO",
});

// Email that was scheduled
const schedule = await workflow
  .schedule({ id: "welcome-email-userId", ttl: 50000 })
  .send({
    project_id: "uAh1XjVUdUfNPKyyvnL7T4AWwZDO",
    template_id: "forgot_password",
    version: "latest",
    subject: "Welcome to Digisign",
    preview_text: "Hello World",
    from: "Orctane Onboarding <onboarding@orctane.dev>",
    to: "Jordan Clement <jordan@acme.com>",
    provider: aws,
    variables: {
      passcode: "1234510",
      expiresIn: "45 minutes",
    },
  });

// Delay feature
await workflow.wait.for({ minutes: 5 }).trigger(schedule);
await workflow.wait.until(new Date("2024-12-31")).trigger(schedule);

// Link Clicking Feature
await workflow.link.when.clicked({ id: "get-started" }).trigger(schedule);
await workflow.link.when
  .clicked({ id: "get-started" })
  .call("https://client.app.com/something-happened");

// Reminder Feature
enum ReminderExpressions {
  EIGHTY_PERCENT = "80%",
  FIVE_MINUTES_BEFORE = "five.minutes.before",
  TEN_MINUTES_BEFORE = "five.minutes.before",
  TEN_HOURS_BEFORE = "10.hours.before",
  EVERY_DAY = "every.day",
  MONDAY_TO_FRIDAY_AT_1AM = "monday-friday.at.1am",
  EVERY_30_MINUTES_BETWEEN_9AM_AND_5PM = "",
}

const reminder = workflow.wait
  .reminder({ ttl: new Date("2024-12-31T"), id: "reminder.userId" })
  .trigger(schedule);
await reminder
  .at("50%")
  .at("60%")
  .at(ReminderExpressions.EIGHTY_PERCENT)
  .at(ReminderExpressions.EVERY_30_MINUTES_BETWEEN_9AM_AND_5PM);

// Manually cancel reminder
if (someThingHappened) {
  await workflow.cancel("reminder.userId"); // All subsequent reminders get cancelled
}

// Cancellation Feature
await workflow.cancel("welcome-email-userId");

await workflow.cancelAll(); // Cancels all existing workflow

/**
 * Non-sending feature
 */

await orctane.template.getRaw({
  projectId: "uAh1XjVUdUfNPKyyvnL7T4AWwZDO",
  templateId: "welcome",
  version: "latest",
});

await orctane.template.get({
  project_id: "uAh1XjVUdUfNPKyyvnL7T4AWwZDO",
  template_id: "forgot_password",
  version: "latest",
  subject: "Welcome to Digisign",
  preview_text: "Hello World",
  from: "Orctane Onboarding <onboarding@orctane.dev>",
  to: "Jordan Clement <jordan@acme.com>",
  variables: {
    passcode: "1234510",
    expiresIn: "45 minutes",
  },
});

await orctane.template.getAllRaw({
  projectId: "uAh1XjVUdUfNPKyyvnL7T4AWwZDO",
});
