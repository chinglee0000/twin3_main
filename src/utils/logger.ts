/**
 * Unified logging utility for Twin3
 * 
 * Usage:
 * ```typescript
 * import { logger } from '@/utils/logger';
 * 
 * logger.debug('Debug message', { data });
 * logger.info('Info message');
 * logger.warn('Warning message');
 * logger.error('Error message', error);
 * ```
 */

const isDev = import.meta.env.DEV;
const enableDebugLogs = import.meta.env.VITE_ENABLE_DEBUG_LOGS === 'true';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerOptions {
  prefix?: string;
  timestamp?: boolean;
}

class Logger {
  private options: LoggerOptions;

  constructor(options: LoggerOptions = {}) {
    this.options = {
      prefix: '',
      timestamp: true,
      ...options,
    };
  }

  private formatMessage(level: LogLevel, ...args: any[]): any[] {
    const parts: any[] = [];

    if (this.options.timestamp) {
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });
      parts.push(`[${time}]`);
    }

    parts.push(`[${level.toUpperCase()}]`);

    if (this.options.prefix) {
      parts.push(`[${this.options.prefix}]`);
    }

    return [...parts, ...args];
  }

  debug(...args: any[]): void {
    if (isDev && enableDebugLogs) {
      console.log(...this.formatMessage('debug', ...args));
    }
  }

  info(...args: any[]): void {
    if (isDev) {
      console.info(...this.formatMessage('info', ...args));
    }
  }

  warn(...args: any[]): void {
    console.warn(...this.formatMessage('warn', ...args));
  }

  error(...args: any[]): void {
    console.error(...this.formatMessage('error', ...args));
  }

  /**
   * Create a child logger with a specific prefix
   */
  child(prefix: string): Logger {
    return new Logger({
      ...this.options,
      prefix: this.options.prefix 
        ? `${this.options.prefix}:${prefix}` 
        : prefix,
    });
  }
}

// Default logger instance
export const logger = new Logger();

// Create specialized loggers for different modules
export const matrixLogger = logger.child('Matrix');
export const chatLogger = logger.child('Chat');
export const authLogger = logger.child('Auth');
export const apiLogger = logger.child('API');
