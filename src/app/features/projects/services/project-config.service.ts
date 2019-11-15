import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Project from '../../../shared/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {

  private projectsConfigSubject: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  projectsConfig$: Observable<Project[]> = this.projectsConfigSubject.asObservable();

  constructor() { }

  updateConfig(config: Project[]) {
    this.projectsConfigSubject.next(config);
  }
}
