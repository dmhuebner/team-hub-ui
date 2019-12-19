import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import DepDiagramConfig from '../interfaces/dep-diagram-config.interface';

@Injectable({
  providedIn: 'root'
})
export class DepDiagramService {

  navRequestSubject = new BehaviorSubject<DepDiagramConfig>(null);
  navRequest$: Observable<DepDiagramConfig> = this.navRequestSubject.asObservable();

  constructor() { }
}
