import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Project from '../../../shared/interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {

  private projectsConfigSubject = new BehaviorSubject<ProjectsConfig>({projects: [], intervalLength: 600000});
  projectsConfig$ = this.projectsConfigSubject.asObservable();

  constructor() { }

  updateConfig(config: ProjectsConfig) {
    this.projectsConfigSubject.next(config);
  }
}

interface ProjectsConfig {
  projects: Project[];
  intervalLength: number;
}
