# Stream Deck transport for Winston

This transport logs messages using the Stream Deck SDK's logger.

## Sample usage

```typescript
import winston from 'winston';
import StreamdeckTransport from 'streamdeck-transport';

const Logger = winston.createLogger({
  level: 'info',
  transports: [new StreamdeckTransport({ scope: 'my-plugin-name' })],
});
```

The maximum log level to log can be configured using the `level`
property in the constructor options:

```typescript
    new StreamdeckTransport({ scope: "my-plugin-name", level: "info" }),
```
