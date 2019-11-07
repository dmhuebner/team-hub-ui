import { Injectable } from '@angular/core';
import * as TEAM_CONFIG from '../../../assets/config.json';
import { BehaviorSubject, Observable } from 'rxjs';
import Config from '../interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  currentConfigSubject: BehaviorSubject<Config> = new BehaviorSubject<Config>(TEAM_CONFIG);
  currentConfig$: Observable<Config> = this.currentConfigSubject.asObservable();

  constructor() { }

  setConfig(config: Config) {
    this.currentConfigSubject.next(config);
  }

}
