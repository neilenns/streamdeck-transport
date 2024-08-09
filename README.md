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

The following options are supported:

| Option | Details                                                                                                                                                           | Required |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| level  | Sets the log level for the transport, to further limit log messages beyond the Winston log level. Valid values are `ERROR`, `WARN`, `DEBUG`, `INFO`, and `TRACE`. | No       |
| scope  | Specifies the custom scope for the log messages.                                                                                                                  | No       |
