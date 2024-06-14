# Orctane Node.js SDK

Node.js library for the Orctane API.

## Install

```bash
npm install @orctane/node
# or
bun add @orctane/node
```

## Examples

Send email with:

- [Node.js](https://github.com/orctane/orctane-node-example)
- [Next.js (App Router)](https://github.com/orctane/orctane-nextjs-app-router-example)
- [Next.js (Pages Router)](https://github.com/orctane/orctane-nextjs-pages-router-example)
- [Express](https://github.com/orctane/orctane-express-example)

## Setup

First, you need to get an API key, which is available in the [Orctane Dashboard](https://orctane.com).

```js
import { Orctane } from 'orctane';
const orctane = new Orctane('orc_123456789');
```

## Usage

Send your first email:

```js
await orctane.pages.send({
  page: 'welcome',
  from: 'you@example.com',
  to: 'user@gmail.com',
  subject: 'hello world',
  variables: {
    username: 'John',
    product: 'MyApp',
    cost: '$10.99'
  }
});
```

## Send email using HTML

Send an email custom HTML content:

```js
await orctane.emails.send({
  from: 'you@example.com',
  to: 'user@gmail.com',
  subject: 'hello world',
  html: '<strong>it works!</strong>',
});
```

## License

MIT License
