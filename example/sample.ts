import Orctane, {
  SESProvider,
  ResendProvider,
  SendgridProvider,
  PostmarkProvider,
} from '@orctane/node';

const orctane = new Orctane('orc_123456789');

/**
 * Sending Feature
 */

const resend = await ResendProvider('API_KEY');

const postmark = await PostmarkProvider('API_KEY');

const sendgrid = await SendgridProvider('API_KEY');

const aws = await SESProvider({
  region: 'eu-west-1',
  accessKeyId: 'AWS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
});

await orctane.send({
  project_id: 'uAh1XjVUdUfNPKyyvnL7T4AWwZDO',
  template_id: 'forgot_password',
  version: 'latest',
  localization: 'fr', // Translate to french
  subject: 'Your forgot password link',
  preview_text: 'Hello World',
  from: 'Orctane Onboarding <onboarding@orctane.dev>',
  to: 'Jordan Isip <jordan@usewaypoint.com>',
  provider: resend,
  variables: {
    passcode: '1234510',
    expiresIn: '45 minutes',
  },
});

/**
 * Workflow
 */
const workflow = await orctane.workflow({
  projectId: 'uAh1XjVUdUfNPKyyvnL7T4AWwZDO',
  id: 'welcome-email-userId',
});

// Email that was scheduled
const schedule = await workflow.schedule({
  template_id: 'forgot_password',
  version: 'latest',
  subject: 'Welcome to Digisign',
  preview_text: 'Hello World',
  from: 'Orctane Onboarding <onboarding@orctane.dev>',
  to: 'Jordan Clement <jordan@acme.com>',
  provider: aws,
  variables: {
    passcode: '1234510',
    expiresIn: '45 minutes',
  },
});

// Delay feature
await workflow.wait.for({ minutes: 5 }).trigger(schedule);
await workflow.wait.until(new Date('2024-12-31')).trigger(schedule);

// Calls the endpoint with a header of orctane-state, which is the user data and user secret token for verification.
const { id: linkId, url } = await workflow.link.create({
  id: 'get-started',
  url: 'https://client.example.com/something-happened?userId=123456789&email=jordan@acme.com',
}); // Use URL in email, e.g as part of variables
console.log(url);

// Link Clicking Feature
await workflow.link.when.clicked({ id: 'get-started' }).trigger(schedule);
await workflow.link.when
  .clicked({ id: linkId })
  .call('https://client.example.com/something-happened');

// Reminder Feature
enum ReminderExpressions {
  THIRTY_MINUTES_BEFORE = '80%',
  FIVE_MINUTES_BEFORE = 'five.minutes.before',
  TEN_MINUTES_BEFORE = 'five.minutes.before',
  TEN_HOURS_BEFORE = '10.hours.before',
  EVERY_DAY = 'every.day',
  TWO_HOURS_BEFORE = 'monday-friday.at.1am',
  EVERY_30_MINUTES_BETWEEN_9AM_AND_5PM = '',
}

const reminder = workflow.wait
  .notify({ expires: new Date('2024-12-31'), id: 'reminder.userId' })
  .add(ReminderExpressions.THIRTY_MINUTES_BEFORE)
  .add(ReminderExpressions.TWO_HOURS_BEFORE)
  .add(ReminderExpressions.TEN_HOURS_BEFORE)
  .trigger(schedule);

const cron = await workflow
  .cron({
    uid: 'abc-userId-cron',
    expression: '0 0-23/6 * * *',
    end: new Date('2024-12-31T09:10:56.78Z'),
    limit: 60,
  })
  .schedule(schedule);

const schema = {
  $schema: 'https://orctane.com/schema/v1/schema.json',
  conditions: [
    {
      stage: 'cycle',
      expression: 'gt',
      action: 'cancel',
      value: 5,
      on_complete: [
        {
          type: 'call_endpoint',
          url: 'https://api.orctane.com/user/<USER_ID>/cancel-subscription',
          method: 'POST',
          headers: {
            'orctane-state': '<USER_DATA_AND_SECRET_TOKEN>',
          },
          body: { hello: 'world' },
          tokenId: 'abc-userId-cron',
        },
      ],
    },
    {
      stage: 'date',
      expression: 'gte',
      value: new Date('2024-12-31T09:10:56.78Z'),
      action: 'cancel',
      on_complete: [
        {
          type: 'call_endpoint',
          url: 'https://api.orctane.com/user/<USER_ID>/cancel-subscription',
          method: 'POST',
          headers: {
            'orctane-state': '<USER_DATA_AND_SECRET_TOKEN>',
          },
          body: { hello: 'world' },
          tokenId: 'abc-userId-cron',
        },
      ],
    },
  ],
};

cron.cycle.skipNext(); // Skips the next cycle of the cron job, and Throws if no email was scheduled
cron.cycle.skip(6); // Skips the next 6 cycles of the cron job, and Throws if no email was scheduled
cron.cancel(); // Cancels a cron job
cron.cycle.gt(5).cancel();
cron.date.gte(new Date('2024-12-31T09:10:56.78Z')).cancel();

// Calls the endpoint with a header of orctane-state, which is the user data and user secret token for verification.
// Should call as a post with data such as { timestamp: 17792112345, cronId: 'abc-userId-cron', cron_status: 'cancelled' }
cron.cycle
  .eq(4)
  .cancel()
  .thenCall('https://api.orctane.com/user/<USER_ID>/cancel-subscription');

cron.cycle
  .eq(4)
  .cancelled.thenCall(
    'https://api.orctane.com/user/<USER_ID>/cancel-subscription',
  );

cron.date
  .eq(new Date('2024-12-31T09:10:56.78Z'))
  .cancelled.thenCall(
    'https://api.orctane.com/user/<USER_ID>/cancel-subscription',
  );

const somethingHappened = true;
// Manually cancel reminder
if (somethingHappened) {
  await workflow.cancel('reminder.userId'); // All subsequent reminders get cancelled
}

// Cancellation Feature
await workflow.cancel('welcome-email-userId');

await workflow.cancelAll(); // Cancels all existing workflow

/**
 * Non-sending feature
 */

await orctane.template.getRaw({
  projectId: 'uAh1XjVUdUfNPKyyvnL7T4AWwZDO',
  templateId: 'welcome',
  version: 'latest',
});

await orctane.template.get({
  project_id: 'uAh1XjVUdUfNPKyyvnL7T4AWwZDO',
  template_id: 'forgot_password',
  version: 'latest',
  subject: 'Welcome to Digisign',
  preview_text: 'Hello World',
  from: 'Orctane Onboarding <onboarding@orctane.dev>',
  to: 'Jordan Clement <jordan@acme.com>',
  variables: {
    passcode: '1234510',
    expiresIn: '45 minutes',
  },
});

await orctane.template.getAllRaw({
  projectId: 'uAh1XjVUdUfNPKyyvnL7T4AWwZDO',
});
