# Orctane Node.js SDK

Node.js library for the Orctane API.

## Prerequisites

To get the most out of this guide, you’ll need to:
- [Create an API key](https://orctane.com/dashboard/api-keys)
- [Create a project](https://orctane.com/dashboard)

## Install

```bash
npm install @orctane/node
# or
bun add @orctane/node
#or 
yarn add @orctane/node
or
pnpm add @orctane/node
```

## Examples
The easiest way to send an email is by using the provider parameter.

```ts server.ts
import Orctane, { ResendProvider } from '@orctane/node';

const orctane = new Orctane('orc_123456789');

const resend = await ResendProvider('API_KEY');

await orctane.send({
  project_id: '<PROJECT_ID>',
  template_id: '<TEMPLATE_ID>', // e.g. forgot_password
  version: 'latest',
  subject: 'Your forgot password link',
  preview_text: 'Hello World',
  from: 'Orctane Onboarding <onboarding@orctane.dev>',
  to: ['Jordan Henshaw <jordan@acme.com>'],
  provider: resend,
  variables: {
    passcode: '1234510',
    expiresIn: '45 minutes',
  },
});
    
```




## License

MIT License
