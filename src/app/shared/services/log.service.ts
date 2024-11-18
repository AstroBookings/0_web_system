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

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logSource = inject(LOG_SOURCE);

  log(message: string, ...args: any[]) {
    console.log(`🔎 [${this.logSource}]: ${message}`, ...args);
  }
}
