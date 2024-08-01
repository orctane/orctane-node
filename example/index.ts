import Orctane, { ResendProvider } from '../src';

const resend = new ResendProvider('re_LUpSe74f_4ypYPaAqsMjmNDdNJF5sJMN7');
const orctane = new Orctane('orc_kVwozhpC0tQRLoC6t9XQNfReMtivku4Pb5');

async function send() {
  await orctane.send({
    project_id: 'q2pf4b-BJUUA3cT4W99CyOqxDRc8',
    template_id: 'godaddythankyou',
    version: 'latest',
    subject: 'Godaddy Thank You (Test)',
    preview_text: "Hi, I'm a test email from Orctane.",
    from: 'Digisign Onboarding <test@notifications.usedigisign.dev>',
    to: ['Simeon <akpanudosimeon@gmail.com>'],
    provider: resend,
    variables: {
      passcode: '1234510',
      expiresIn: '45 minutes',
    },
  });
}

// await send();

async function getTemplate() {
  const template = await orctane.template.get({
    project_id: 'q2pf4b-BJUUA3cT4W99CyOqxDRc8',
    template_id: 'godaddythankyou',
    version: 'latest',
    preview_text: "Hi, I'm a test email from Orctane.",
  });

  console.log(template);
}

// await getTemplate();

async function getRawTemplate() {
  const template = await orctane.template.getAllRaw(
    'q2pf4b-BJUUA3cT4W99CyOqxDRc8',
    {
      version: 'latest',
      per_page: 10,
      page: 1,
    },
  );

  console.log(template);
}

// await getRawTemplate();
//
// const workflow = orctane.workflow({
//   projectId: 'uAh1XjVUdUfNPKyyvnL7T4AWwZDO',
// });
//
// const schedule = await workflow
//   .schedule({ id: 'welcome-email-userId', ttl: 50000 })
//   .send({
//     project_id: 'uAh1XjVUdUfNPKyyvnL7T4AWwZDO',
//     template_id: 'forgot_password',
//     version: 'latest',
//     subject: 'Welcome to Digisign',
//     preview_text: 'Hello World',
//     from: 'Orctane Onboarding <onboarding@orctane.dev>',
//     to: ['Jordan Clement <jordan@acme.com>'],
//     provider: resend,
//     variables: {
//       passcode: '1234510',
//       expiresIn: '45 minutes',
//     },
//   });
//
// const cron = workflow.cron({
//   id: 'abc-userId-cron',
//   expression: '0 0-23/6 * * *',
// });
// await cron.schedule(schedule);
// await cron.cycle.skipNext(); // Skips the next cycle of the cron job, and Throws if no email was scheduled
// await cron.cycle.skip(6); // Skips the next 6 cycles of the cron job, and Throws if no email was scheduled
// await cron.cancel(); // Cancels a cron job
// await cron.cycle.gt(5).cancel();
// await cron.date.gte(new Date('2024-12-31T09:10:56.78Z')).cancel();
