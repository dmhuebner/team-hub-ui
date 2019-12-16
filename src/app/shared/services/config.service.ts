import { Injectable } from '@angular/core';
import * as TEAM_CONFIG from '../../../assets/config.json';
import { BehaviorSubject, Observable } from 'rxjs';
import Config from '../interfaces/config.interface';
import { map } from 'rxjs/operators';
import ConfigWrapper from '../interfaces/config-wrapper.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private currentConfigSubject: BehaviorSubject<ConfigWrapper> = new BehaviorSubject<Config>(TEAM_CONFIG);
  currentConfig$: Observable<Config> = this.currentConfigSubject.asObservable().pipe(map(config => config.default));

  constructor() {}

  setConfig(config: Config) {
    // We pass default because the module automatically has a wrapper with default property
    this.currentConfigSubject.next({default: config});
  }

}
