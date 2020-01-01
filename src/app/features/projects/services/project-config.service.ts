import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Project from '../interfaces/project.interface';
import LoginForToken from '../../../shared/interfaces/login-for-token.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {

  private projectsConfigSubject = new BehaviorSubject<ProjectsConfig>({projects: [], intervalLength: 600000, loginForToken: null});
  projectsConfig$ = this.projectsConfigSubject.asObservable();

  constructor() { }

  updateConfig(config: ProjectsConfig) {
    this.projectsConfigSubject.next(config);
  }
}

interface ProjectsConfig {
  projects: Project[];
  intervalLength: number;
  loginForToken: LoginForToken;
}
