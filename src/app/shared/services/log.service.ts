import { inject, Injectable, InjectionToken } from '@angular/core';

/**
 * Injection Token for the Log Source, used to identify the source of the log
 */
export const LOG_SOURCE = new InjectionToken<string>('LOG_SOURCE');

/**
 * Provide the LogService with a source
 * @param source - The source of the log
 * @returns An array of providers with the LOG_SOURCE and LogService
 */
export function provideLog(source: string) {
  return [{ provide: LOG_SOURCE, useValue: source }, LogService];
}

/**
 * LogService writes messages to the console prefixed with a source
 */
@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logSource = inject(LOG_SOURCE);
  /**
   * Logs a message with the source
   * @param message - The message to log
   * @param args - The arguments to log
   */
  public log(message: string, ...args: unknown[]) {
    console.log(`🔎 [${this.logSource}]: ${message}`, ...args);
  }
}
