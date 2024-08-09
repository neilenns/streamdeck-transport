import streamDeck, { LogLevel } from "@elgato/streamdeck";
import { TransformableInfo } from "logform";
import { LEVEL } from "triple-beam";
import Transport from "winston-transport";

/**
 * Options for the Streamdeck transport.
 */
type StreamdeckTransportOptions = Transport.TransportStreamOptions & {
  /**
   * Sets the logging scope for the Streamdeck logger.
   */
  scope?: string;
};

/**
 * Converts a Winston log level to a Streamdeck LogLevel.
 * @param level The Winston log level
 * @returns The Streamdeck LogLevel, or LogLevel.INFO if the Winston log level couldn't be mapped
 */
function stringToLogLevel(level: string): LogLevel {
  // Convert the string to uppercase and check if it matches an enum key
  const upperCaseLevel = level.toUpperCase();
  // Use bracket notation to access enum value
  if (upperCaseLevel in LogLevel) {
    return LogLevel[upperCaseLevel as keyof typeof LogLevel];
  } else {
    return LogLevel.INFO; // Default to INFO
  }
}

/**
 * Logs Winston messages using the Streamdeck logger.
 */
class StreamdeckTransport extends Transport {
  private logger: ReturnType<typeof streamDeck.logger.createScope>;

  /**
   * Creates a new Streamdeck transport with the specified scope and Winston log level.
   * @param opts The options for the transport
   */
  constructor(opts?: StreamdeckTransportOptions) {
    super(opts);

    this.logger = streamDeck.logger.createScope(opts?.scope ?? "");
    this.logger.setLevel(stringToLogLevel(opts?.level ?? "DEBUG"));
  }

  /**
   * Logs the info to the Streamdeck logger.
   * @param info The info to log
   * @param callback The next function to call
   */
  log(info: TransformableInfo, callback: () => void) {
    const json = JSON.stringify(info);
    const messageLevel = info[LEVEL];

    switch (messageLevel) {
      case "debug":
        this.logger.debug(json);
        break;
      case "error":
        this.logger.error(json);
        break;
      case "info":
        this.logger.info(json);
        break;
      case "trace":
        this.logger.trace(json);
        break;
      case "warn":
        this.logger.warn(json);
        break;
      default:
        this.logger.info(json);
        break;
    }

    callback();
  }
}

export default StreamdeckTransport;
