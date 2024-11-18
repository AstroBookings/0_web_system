import {
  EnvironmentProviders,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';

/**
 * Injection Token for the Log Source, used to identify the source of the log
 */
export const LOG_SOURCE = new InjectionToken<string>('LOG_SOURCE');

export function provideLogSource(source: string): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: LOG_SOURCE, useValue: source }]);
}

export function provideLogService(source: string) {
  return [{ provide: LOG_SOURCE, useValue: source }, LogService];
}

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logSource = inject(LOG_SOURCE);

  log(message: string, ...args: any[]) {
    console.log(`🔎 ${this.logSource}: ${message}`, ...args);
  }
}
